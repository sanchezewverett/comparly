# resource "aws_security_group" "lambda" {
#   vpc_id = aws_vpc.main.id
#   tags = {
#     Name        = "comparly-${terraform.workspace}-lambda-sg"
#     Environment = terraform.workspace
#   }
# }