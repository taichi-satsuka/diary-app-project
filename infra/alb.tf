resource "aws_lb" "diary-app-lb" {
  name               = "diary-app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.sg_alb.id]
  subnets            = [
    aws_subnet.app_public_subnet_1a.id,
    aws_subnet.app_public_subnet_1c.id
  ]

  enable_deletion_protection = false

  tags = {
    Name = "app_alb"
  }
}