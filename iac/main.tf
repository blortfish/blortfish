provider "aws" {
  region = "us-east-1"
}

locals {
  portfolio_origin_id = "portfolio"
}

terraform {
  backend "s3" {
    bucket = "tf-infra-backend"
    key = "danielflint"
    region = "us-east-1"
  }
}

resource "aws_s3_bucket" "portfolio" {
  bucket = "danielflint.com"
}

resource "aws_cloudfront_origin_access_identity" "s3-origin-access" {
  comment = "s3 origin access identity"
}

data "aws_iam_policy_document" "portfolio_s3_policy" {
  statement {
    actions = [
      "s3:GetObject"]
    resources = [
      "${aws_s3_bucket.portfolio.arn}/*"]

    principals {
      type = "AWS"
      identifiers = [
        aws_cloudfront_origin_access_identity.s3-origin-access.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "portfolio_bucket_policy" {
  bucket = aws_s3_bucket.portfolio.id
  policy = data.aws_iam_policy_document.portfolio_s3_policy.json
}

module "acm-danielflint" {
  source = "terraform-aws-modules/acm/aws"
  version = "~> 3.0"
  domain_name = "danielflint.com"
  zone_id = aws_route53_zone.danielflint.zone_id
}

resource "aws_route53_zone" "danielflint" {
  name = "danielflint.com"
}

resource "aws_route53_record" "danielflint_r53" {
  zone_id = aws_route53_zone.danielflint.zone_id
  name = "danielflint.com"
  type = "A"
  alias {
    evaluate_target_health = false
    zone_id = aws_cloudfront_distribution.danielflint_cloudfront.hosted_zone_id
    name = aws_cloudfront_distribution.danielflint_cloudfront.domain_name
  }
}

resource "aws_cloudfront_distribution" "danielflint_cloudfront" {

  price_class = "PriceClass_100"
  enabled = true
  is_ipv6_enabled = true
  aliases = ["danielflint.com"]
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id = local.portfolio_origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.s3-origin-access.cloudfront_access_identity_path
    }
  }

  viewer_certificate {
    acm_certificate_arn = module.acm-danielflint.acm_certificate_arn
    ssl_support_method = "sni-only"
  }

  default_cache_behavior {
    min_ttl = 0
    default_ttl = 0
    max_ttl = 0
    compress = true
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id = local.portfolio_origin_id
    allowed_methods = [
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT"]

    cached_methods = [
      "GET",
      "HEAD"]
    forwarded_values {
      query_string = false
      headers = [
        "Origin"]

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations = [
        "US",
        "CA",
        "GB",
        "DE"]
    }
  }
}
