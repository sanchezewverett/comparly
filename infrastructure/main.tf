# provider "aws" {
#   region = "eu-west-1"
# }

# terraform {
#   backend "s3" {
#     bucket                  = "comparly-terraform-state"
#     key                     = "terraform.tfstate"
#     workspace_key_prefix    = "workspaces"
#     region                  = "eu-west-1"
#     encrypt                 = true
#   }
# }