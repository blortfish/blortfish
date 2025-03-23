# CloudFront certificates must be in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

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
# ExcludeTube API - API Gateway with ALB
###############################################

module "excludetube_api" {
  source = "./modules/api-gateway"

  api_name   = "ExcludeTube API"
  alb_name   = "excludetube-api-alb"
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
# Portfolio Site - Static Site
###############################################

module "portfolio" {
  source = "./modules/static-site"

  site_name    = "Portfolio Site"
  bucket_name  = "dflint-portfolio"
  domain_names = ["dflint.dev", "www.dflint.dev"]
  is_spa       = true  # Assuming it's a SPA too

  providers = {
    aws.us_east_1 = aws.us_east_1
  }
}

###############################################
# Route 53 DNS Records
###############################################

# Assuming the zones are already created and imported

data "aws_route53_zone" "excludetube" {
  name = "excludetube.com."
}

data "aws_route53_zone" "portfolio" {
  name = "danielflint.com."
}

# Records for ExcludeTube UI
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

# Records for ExcludeTube API
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

# Records for Portfolio
resource "aws_route53_record" "portfolio" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = "dflint.dev"
  type    = "A"

  alias {
    name                   = module.portfolio.cloudfront_distribution_domain_name
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront hosted zone ID
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_portfolio" {
  zone_id = data.aws_route53_zone.portfolio.zone_id
  name    = "www.dflint.dev"
  type    = "A"

  alias {
    name                   = module.portfolio.cloudfront_distribution_domain_name
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront hosted zone ID
    evaluate_target_health = false
  }
}

# Certificate validation records
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

# Certificate validation for ExcludeTube UI
resource "aws_acm_certificate_validation" "excludetube_ui" {
  provider                = aws.us_east_1
  certificate_arn         = module.excludetube_ui.acm_certificate_arn
  validation_record_fqdns = [for record in aws_route53_record.excludetube_ui_validation : record.fqdn]
}

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

# Certificate validation for ExcludeTube API
resource "aws_acm_certificate_validation" "excludetube_api" {
  certificate_arn         = module.excludetube_api.acm_certificate_arn
  validation_record_fqdns = [for record in aws_route53_record.excludetube_api_validation : record.fqdn]
}

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

# Certificate validation for Portfolio
resource "aws_acm_certificate_validation" "portfolio" {
  provider                = aws.us_east_1
  certificate_arn         = module.portfolio.acm_certificate_arn
  validation_record_fqdns = [for record in aws_route53_record.portfolio_validation : record.fqdn]
}
