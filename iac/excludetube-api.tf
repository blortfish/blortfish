###############################################
# ExcludeTube API - API Gateway with ALB
###############################################

module "excludetube_api" {
  source = "./modules/api-gateway"

  api_name    = "ExcludeTube API"
  alb_name    = "excludetube-api-alb"
  domain_name = "api.excludetube.com"

  vpc_id     = aws_vpc.main.id
  subnet_ids = aws_subnet.public[*].id

  container_port      = 8080
  health_check_path   = "/"  # GraphQL playground is at root

  use_cloudfront      = true

  # Headers to forward to the origin
  forwarded_headers   = [
    "Authorization",
    "Host",
    "Origin",
    "Referer",
    "User-Agent",
    "X-Forwarded-For"
  ]
}

###############################################
# Route 53 Records for ExcludeTube API
###############################################

resource "aws_route53_record" "excludetube_api" {
  zone_id = data.aws_route53_zone.excludetube.zone_id
  name    = "api.excludetube.com"
  type    = "A"

  alias {
    name                   = module.excludetube_api.use_cloudfront ? module.excludetube_api.cloudfront_distribution_domain_name : module.excludetube_api.alb_dns_name
    zone_id                = module.excludetube_api.use_cloudfront ? "Z2FDTNDATAQYW2" : module.excludetube_api.alb_zone_id  # CloudFront or ALB zone ID
    evaluate_target_health = false
  }
}

###############################################
# ASG Attachment to Target Group
###############################################

resource "aws_autoscaling_attachment" "asg_attachment" {
  autoscaling_group_name = aws_autoscaling_group.ecs.name
  lb_target_group_arn    = module.excludetube_api.target_group_arn
  
  # Add explicit dependency on the target group and ALB
  depends_on = [module.excludetube_api]
  
  # Add lifecycle policy to handle changes gracefully
  lifecycle {
    create_before_destroy = true
  }
}

###############################################
# Certificate Validation for ExcludeTube API
###############################################

resource "aws_route53_record" "excludetube_api_validation" {
  for_each = {
    for dvo in module.excludetube_api.acm_certificate_validation_domains : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.excludetube.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "excludetube_api" {
  certificate_arn         = module.excludetube_api.acm_certificate_arn
  validation_record_fqdns = [for record in aws_route53_record.excludetube_api_validation : record.fqdn]
}
