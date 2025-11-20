resource "aws_route_table" "app_public_rt" {
  vpc_id = aws_vpc.diary_app_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.diary_app_igw.id
  }

  tags = {
    Name = "rt-igw"
  }
}

resource "aws_route_table_association" "app_public_rt_assoc_1a" {
  subnet_id      = aws_subnet.app_public_subnet_1a.id
  route_table_id = aws_route_table.app_public_rt.id
}
