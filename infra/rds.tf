resource "aws_db_instance" "diary_app_rds" {
  identifier             = "diary-app-rds"
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  username               = "app"       # docker-composeのMYSQL_USER
  password               = "secret123"    # docker-composeのMYSQL_PASSWORD
  db_name                = "diary_app" # docker-composeのMYSQL_DATABASE
  parameter_group_name   = aws_db_parameter_group.app_rds_params.name
  multi_az               = false
  publicly_accessible    = false
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.sg_rds.id]
  db_subnet_group_name   = aws_db_subnet_group.app_db_subnet.name
}

resource "aws_db_parameter_group" "app_rds_params" {
  name        = "app-rds-params"
  family      = "mysql8.0"
  description = "Custom parameter group for diary-app"

  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }

  parameter {
    name  = "collation_server"
    value = "utf8mb4_unicode_ci"
  }

  parameter {
    name  = "time_zone"
    value = "Asia/Tokyo"
  }
}
