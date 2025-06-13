resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name        = "comparly-${terraform.workspace}-vpc"
    Environment = terraform.workspace
  }
}

resource "aws_subnet" "main" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  tags = {
    Name        = "comparly-${terraform.workspace}-subnet-${count.index}"
    Environment = terraform.workspace
  }
}

data "aws_availability_zones" "available" {}

resource "aws_db_subnet_group" "main" {
  name       = "comparly-${terraform.workspace}-db-subnet-group"
  subnet_ids = aws_subnet.main[*].id
}


resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.main)
  subnet_id      = aws_subnet.main[count.index].id
  route_table_id = aws_route_table.public.id
}