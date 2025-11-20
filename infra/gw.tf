# IGWの作成
resource "aws_internet_gateway" "diary_app_igw" {
  vpc_id = aws_vpc.diary_app_vpc.id

  tags = {
    Name = "diary-app-igw"
  }
}