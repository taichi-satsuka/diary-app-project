resource "aws_vpc" "diary_app_vpc" {
  cidr_block           = "192.168.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "taichi-diary-app-vpc"
  }
}

resource "aws_subnet" "app_public_subnet_1a" {
  vpc_id                  = aws_vpc.diary_app_vpc.id
  cidr_block              = "192.168.0.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "diary-app-public-subnet-1a"
  }
}

resource "aws_subnet" "app_public_subnet_1c" {
  vpc_id                  = aws_vpc.diary_app_vpc.id
  cidr_block              = "192.168.1.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true
  tags = {
    Name = "diary-app-public-subnet-1c"
  }
}

resource "aws_subnet" "app_private_subnet_1a" {
  vpc_id                  = aws_vpc.diary_app_vpc.id
  cidr_block              = "192.168.2.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = false
  tags = {
    Name = "diary-app-private-subnet-1a"
  }
}

resource "aws_subnet" "app_private_subnet_1c" {
  vpc_id                  = aws_vpc.diary_app_vpc.id
  cidr_block              = "192.168.3.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = false
  tags = {
    Name = "diary-app-private-subnet-1c"
  }
}

resource "aws_subnet" "app_private_subnet_1d" {
  vpc_id                  = aws_vpc.diary_app_vpc.id
  cidr_block              = "192.168.4.0/24"
  availability_zone       = "ap-northeast-1d"
  map_public_ip_on_launch = false
  tags = {
    Name = "diary-app-private-subnet-1d"
  }
}

resource "aws_db_subnet_group" "app_db_subnet" {
  name        = "app-db-subnet-group"
  description = "Subnet group for diary app RDS"
  subnet_ids = [
    aws_subnet.app_private_subnet_1c.id,
    aws_subnet.app_private_subnet_1d.id
  ]

  tags = {
    Name = "diary-app-db-subnet-group"
  }
}
