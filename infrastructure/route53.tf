# data "aws_route53_zone" "main" {
#   name         = "themovement.agency."
#   private_zone = false
# }

# resource "aws_route53_record" "dev_comparly" {
#   zone_id = data.aws_route53_zone.main.zone_id
#   name    = "comparly-dev.themovement.agency"
#   type    = "CNAME"
#   ttl     = 300
#   records = [aws_elastic_beanstalk_environment.env.cname]
# }