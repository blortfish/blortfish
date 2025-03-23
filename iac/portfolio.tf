###############################################
# Portfolio Site - Static Site
###############################################

module "portfolio" {
  source = "./modules/static-site"

  site_name    = "Portfolio Site"
  bucket_name  = "dflint-portfolio"
  domain_names = ["danielflint.com", "www.danielflint.com"]
  is_spa       = true  # Assuming it's a SPA too

  providers = {
    aws.us_east_1 = aws.us_east_1
  }
}

###############################################
# Route 53 Records for Portfolio
###############################################

resource "aws_route53_record" "portfolio" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = "danielflint.com"
  type    = "A"

  alias {
    name                   = module.portfolio.cloudfront_distribution_domain_name
    zone_id                = module.portfolio.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_portfolio" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = "www.danielflint.com"
  type    = "A"

  alias {
    name                   = module.portfolio.cloudfront_distribution_domain_name
    zone_id                = module.portfolio.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}

###############################################
# Certificate Validation for Portfolio
###############################################

resource "aws_route53_record" "portfolio_validation" {
  for_each = {
    for dvo in module.portfolio.acm_certificate_validation_domains : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "portfolio" {
  provider                = aws.us_east_1
  certificate_arn         = module.portfolio.acm_certificate_arn
  validation_record_fqdns = [for record in aws_route53_record.portfolio_validation : record.fqdn]
}
