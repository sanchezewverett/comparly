# resource "aws_security_group" "rds" {
#   vpc_id = aws_vpc.main.id

#   ingress {
#     from_port       = 5432
#     to_port         = 5432
#     protocol        = "tcp"
#     security_groups = [aws_security_group.lambda.id, aws_security_group.ec2.id]
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = {
#     Name        = "comparly-${terraform.workspace}-rds-sg"
#     Environment = terraform.workspace
#   }
# }

# resource "aws_db_instance" "postgres" {
#   identifier              = "${terraform.workspace}-comparly-db"
#   engine                  = "postgres"
#   instance_class          = "db.t3.micro"
#   allocated_storage       = 20
#   max_allocated_storage   = 40
#   username                = var.db_username
#   password                = var.db_password
#   db_subnet_group_name    = aws_db_subnet_group.main.name
#   vpc_security_group_ids  = [aws_security_group.rds.id]
#   skip_final_snapshot     = true
#   publicly_accessible     = false
#   multi_az                = false
#   storage_encrypted       = true
#   backup_retention_period = 0
#   performance_insights_enabled = false
#   monitoring_interval     = 0
#   tags = {
#     Name        = "${terraform.workspace}-comparly-db"
#     Environment = terraform.workspace
#   }
# }

# output "rds_endpoint" {
#   value = aws_db_instance.postgres.address
# }