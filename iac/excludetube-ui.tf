###############################################
# ExcludeTube UI - Static Site
###############################################

module "excludetube_ui" {
  source = "./modules/static-site"

  site_name    = "ExcludeTube UI"
  bucket_name  = "excludetube-ui"
  domain_names = ["excludetube.com", "www.excludetube.com"]
  is_spa       = true  # Single Page Application

  providers = {
    aws.us_east_1 = aws.us_east_1
  }
}

###############################################
# Route 53 Records for ExcludeTube UI
###############################################

resource "aws_route53_record" "excludetube_ui" {
  zone_id = data.aws_route53_zone.excludetube.zone_id
  name    = "excludetube.com"
  type    = "A"

  alias {
    name                   = module.excludetube_ui.cloudfront_distribution_domain_name
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront hosted zone ID
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_excludetube_ui" {
  zone_id = data.aws_route53_zone.excludetube.zone_id
  name    = "www.excludetube.com"
  type    = "A"

  alias {
    name                   = module.excludetube_ui.cloudfront_distribution_domain_name
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront hosted zone ID
    evaluate_target_health = false
  }
}

###############################################
# Certificate Validation for ExcludeTube UI
###############################################

resource "aws_route53_record" "excludetube_ui_validation" {
  for_each = {
    for dvo in module.excludetube_ui.acm_certificate_validation_domains : dvo.domain_name => {
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

resource "aws_acm_certificate_validation" "excludetube_ui" {
  provider                = aws.us_east_1
  certificate_arn         = module.excludetube_ui.acm_certificate_arn
  validation_record_fqdns = [for record in aws_route53_record.excludetube_ui_validation : record.fqdn]
}
