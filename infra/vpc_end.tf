###################################
# VPC エンドポイント（必須4つ）
###################################

# ECR API
resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id            = aws_vpc.diary_app_vpc.id
  service_name      = "com.amazonaws.ap-northeast-1.ecr.api"
  vpc_endpoint_type = "Interface"

  subnet_ids = [
    aws_subnet.app_private_subnet_1a.id,
  ]

  security_group_ids = [aws_security_group.sg_vpc_endpoint.id]

  private_dns_enabled = true
}

# ECR Docker registry
resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id            = aws_vpc.diary_app_vpc.id
  service_name      = "com.amazonaws.ap-northeast-1.ecr.dkr"
  vpc_endpoint_type = "Interface"

  subnet_ids = [
    aws_subnet.app_private_subnet_1a.id,
  ]

  security_group_ids = [aws_security_group.sg_vpc_endpoint.id]

  private_dns_enabled = true
}

# CloudWatch Logs
resource "aws_vpc_endpoint" "logs" {
  vpc_id            = aws_vpc.diary_app_vpc.id
  service_name      = "com.amazonaws.ap-northeast-1.logs"
  vpc_endpoint_type = "Interface"

  subnet_ids = [
    aws_subnet.app_private_subnet_1a.id,
  ]

  security_group_ids = [aws_security_group.sg_vpc_endpoint.id]

  private_dns_enabled = true
}

# S3 (Gateway endpoint)
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.diary_app_vpc.id
  service_name      = "com.amazonaws.ap-northeast-1.s3"
  vpc_endpoint_type = "Gateway"

  route_table_ids = [
    aws_route_table.app_private_rt.id,
  ]
}

# SecretsManagerのvpc endpoint
resource "aws_vpc_endpoint" "secretsmanager" {
  vpc_id              = aws_vpc.diary_app_vpc.id
  service_name        = "com.amazonaws.ap-northeast-1.secretsmanager"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.app_private_subnet_1a.id]
  security_group_ids  = [aws_security_group.sg_vpc_endpoint.id]
  private_dns_enabled = true
}

###################################
# SSM関連のVPC endpoint
###################################
resource "aws_vpc_endpoint" "ssm" {
  vpc_id              = aws_vpc.diary_app_vpc.id
  service_name        = "com.amazonaws.ap-northeast-1.ssm"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.app_private_subnet_1a.id]
  security_group_ids  = [aws_security_group.sg_vpc_endpoint.id]
  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "ssm-messages" {
  vpc_id              = aws_vpc.diary_app_vpc.id
  service_name        = "com.amazonaws.ap-northeast-1.ssmmessages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.app_private_subnet_1a.id]
  security_group_ids  = [aws_security_group.sg_vpc_endpoint.id]
  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "ec2-messages" {
  vpc_id              = aws_vpc.diary_app_vpc.id
  service_name        = "com.amazonaws.ap-northeast-1.ec2messages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.app_private_subnet_1a.id]
  security_group_ids  = [aws_security_group.sg_vpc_endpoint.id]
  private_dns_enabled = true
}
