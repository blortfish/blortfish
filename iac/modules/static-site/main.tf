###############################################
# S3 Bucket for Static Hosting
###############################################

resource "aws_s3_bucket" "site" {
  bucket = var.bucket_name

  tags = {
    Name = var.site_name
  }
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration {
    status = var.enable_versioning ? "Enabled" : "Disabled"
  }
}

resource "aws_s3_bucket_cors_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = formatlist("https://%s", var.domain_names)
    expose_headers  = []
    max_age_seconds = 3600
  }
}

###############################################
# CloudFront Origin Access Identity
###############################################

resource "aws_cloudfront_origin_access_identity" "site" {
  comment = "OAI for ${var.site_name}"
}

###############################################
# S3 Bucket Policy
###############################################

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { AWS = aws_cloudfront_origin_access_identity.site.iam_arn }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.site.arn}/*"
      }
    ]
  })
}

###############################################
# ACM Certificate
###############################################

resource "aws_acm_certificate" "site" {
  provider                  = aws.us_east_1 # CloudFront requires certificates in us-east-1
  domain_name               = var.domain_names[0]
  validation_method         = "DNS"
  subject_alternative_names = length(var.domain_names) > 1 ? slice(var.domain_names, 1, length(var.domain_names)) : []

  lifecycle {
    create_before_destroy = true
  }
}

# Certificate Validation is handled outside the module to connect with DNS records

###############################################
# CloudFront Distribution
###############################################

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.site_name} Distribution"
  default_root_object = "index.html"
  price_class         = var.cloudfront_price_class
  wait_for_deployment = false

  # Main S3 origin
  origin {
    domain_name = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id   = "S3-${var.bucket_name}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.site.cloudfront_access_identity_path
    }
  }

  # Default cache behavior
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "S3-${var.bucket_name}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
      headers = ["Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"]
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = var.min_ttl
    default_ttl            = var.default_ttl
    max_ttl                = var.max_ttl
    compress               = true
  }

  dynamic "custom_error_response" {
    for_each = var.is_spa ? [404, 403] : []
    content {
      error_code         = custom_error_response.value
      response_code      = 200
      response_page_path = "/index.html"
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = var.domain_names

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.site.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # For SPA routing
  dynamic "ordered_cache_behavior" {
    for_each = var.is_spa ? [1] : []
    content {
      path_pattern     = "/*"
      allowed_methods  = ["GET", "HEAD", "OPTIONS"]
      cached_methods   = ["GET", "HEAD", "OPTIONS"]
      target_origin_id = "S3-${var.bucket_name}"

      forwarded_values {
        query_string = false
        cookies {
          forward = "none"
        }
        headers = ["Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"]
      }

      viewer_protocol_policy = "redirect-to-https"
      min_ttl                = var.min_ttl
      default_ttl            = var.default_ttl
      max_ttl                = var.max_ttl
      compress               = true
    }
  }
}