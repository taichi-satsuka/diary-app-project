resource "aws_lb" "diary-app-lb" {
  name               = "diary-app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.sg_alb.id]
  subnets = [
    aws_subnet.app_public_subnet_1a.id,
    aws_subnet.app_public_subnet_1c.id
  ]

  enable_deletion_protection = false

  tags = {
    Name = "app_alb"
  }
}

resource "aws_lb_target_group" "diary-app-tg" {
  name        = "diary-app-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.diary_app_vpc.id
  target_type = "ip"
  health_check {
    path                = "/"       # チェックする URL
    interval            = 30        # チェックの間隔（秒）
    timeout             = 5         # タイムアウトまでの秒数
    healthy_threshold   = 2         # 連続成功回数で healthy と判断
    unhealthy_threshold = 2         # 連続失敗回数で unhealthy と判断
    matcher             = "200-399" # 正常と判断する HTTP ステータスコード
  }
}

resource "aws_lb_listener" "diary-app-alb-listener" {
  load_balancer_arn = aws_lb.diary-app-lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.diary-app-tg.arn
  }
}