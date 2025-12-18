resource "aws_ecs_cluster" "diary_app_cluster" {
  name = "satsuka-app-cluster"
}

resource "aws_cloudwatch_log_group" "diary_app" {
  name              = "/ecs/diary-app"
  retention_in_days = 1
  tags = {
    Environment = "dev"
    Project     = "diary-app"
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "diary-app-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "ecs_task_secrets_attach" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
}

resource "aws_iam_role" "ecs_task_role" {
  name = "diary-app-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_role_ssm_attach" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}


resource "aws_ecs_task_definition" "diary_app_task_definition" {
  family                   = "diary-app"
  cpu                      = "1024"
  memory                   = "2048"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn



  runtime_platform {
    cpu_architecture        = "ARM64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name      = "app-nginx"
      image     = "890942158228.dkr.ecr.ap-northeast-1.amazonaws.com/satsuka-diary-app:nginx-v1.0.0"
      essential = true
      portMappings = [{
        containerPort = 80
        hostPort      = 80
      }]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/diary-app"
          "awslogs-region"        = "ap-northeast-1"
          "awslogs-stream-prefix" = "nginx"
        }
      }
      dependsOn = [
        { containerName = "php-fpm-prod", condition = "START" },
        { containerName = "nuxt-app-prod", condition = "START" }
      ]
    },
    {
      name      = "nuxt-app-prod"
      image     = "890942158228.dkr.ecr.ap-northeast-1.amazonaws.com/satsuka-diary-app:node-v1.0.1"
      essential = true
      portMappings = [{
        containerPort = 3000
        hostPort      = 3000
      }]
      environment = [
        { name = "NUXT_PUBLIC_API_BASE", value = "http://${aws_lb.diary-app-lb.dns_name}/graphql" }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/diary-app"
          "awslogs-region"        = "ap-northeast-1"
          "awslogs-stream-prefix" = "nuxt"
        }
      }
    },
    {
      name      = "php-fpm-prod"
      image     = "890942158228.dkr.ecr.ap-northeast-1.amazonaws.com/satsuka-diary-app:php-v2.0.0"
      essential = true
      portMappings = [{
        containerPort = 9000
        hostPort      = 9000
      }]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/diary-app"
          "awslogs-region"        = "ap-northeast-1"
          "awslogs-stream-prefix" = "php"
        }
      }

      environment = [
        { name = "APP_DEBUG", value = "false" },
        { name = "APP_ENV", value = "production" },
        { name = "APP_URL", value = "http://localhost" },
        { name = "DB_CONNECTION", value = var.db_connection },
        { name = "DB_HOST", value = aws_db_instance.diary_app_rds.endpoint },
        { name = "DB_DATABASE", value = var.db_database },
        { name = "DB_USERNAME", value = var.db_username },
        { name = "DB_PORT", value = var.db_port },
      ]

      secrets = [
        {
          name      = "DB_PASSWORD"
          valueFrom = aws_secretsmanager_secret_version.db_password_version.arn
        },
        {
          name      = "APP_KEY"
          valueFrom = aws_secretsmanager_secret_version.app_key_version.arn
        }
      ]
    },
  ])
}

resource "aws_ecs_service" "diary_app_service" {
  name                   = "satsuka-diary-app-service"
  cluster                = aws_ecs_cluster.diary_app_cluster.id
  task_definition        = aws_ecs_task_definition.diary_app_task_definition.arn
  desired_count          = 1
  enable_execute_command = true

  launch_type = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.app_private_subnet_1a.id]
    security_groups  = [aws_security_group.sg_app.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.diary-app-tg.arn
    container_name   = "app-nginx"
    container_port   = 80
  }

  depends_on = [aws_iam_role_policy_attachment.ecs_task_execution_role_policy]
}
