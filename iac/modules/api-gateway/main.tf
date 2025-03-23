###############################################
# Application Load Balancer for API
###############################################

resource "aws_lb" "api" {
  name               = var.alb_name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = var.subnet_ids

  enable_deletion_protection = var.enable_deletion_protection

  tags = {
    Name = var.alb_name
  }
}

resource "aws_lb_target_group" "api" {
  name     = "${var.alb_name}-tg"
  port     = var.container_port
  protocol = "HTTP"
  vpc_id   = var.vpc_id
  
  target_type = "instance"  # Must be "instance" for ASG attachment

  health_check {
    path                = var.health_check_path
    port                = "traffic-port"
    healthy_threshold   = 2
    unhealthy_threshold = 5
    timeout             = 10
    interval            = 30
    matcher             = "200-299" # Accept any 2xx response
  }
  
  # Add lifecycle configuration to prevent replacement issues
  lifecycle {
    create_before_destroy = true
  }
}

# Create direct target group attachments if instance IDs are provided
# Note: This is only for directly specified instances, not ASG instances
resource "aws_lb_target_group_attachment" "api" {
  count            = length(var.target_ids)
  target_group_arn = aws_lb_target_group.api.arn
  target_id        = var.target_ids[count.index]
  port             = var.container_port
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.api.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
  
  depends_on = [aws_lb_target_group.api]
  
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.api.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.api.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }

  # Make this dependent on the target group
  depends_on = [aws_lb_target_group.api]

  # Add lifecycle policy to handle target group replacements properly
  lifecycle {
    create_before_destroy = true
  }
}

###############################################
# Security Group for ALB
###############################################

resource "aws_security_group" "alb" {
  name        = "${var.alb_name}-sg"
  description = "Security group for ${var.alb_name} ALB"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP access"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS access"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

###############################################
# ACM Certificate for API
###############################################

resource "aws_acm_certificate" "api" {
  domain_name               = var.domain_name
  validation_method         = "DNS"
  subject_alternative_names = []

  lifecycle {
    create_before_destroy = true
  }
}

# Certificate Validation is handled outside the module to connect with DNS records

###############################################
# CloudFront Distribution for API (if enabled)
###############################################

resource "aws_cloudfront_distribution" "api" {
  count = var.use_cloudfront ? 1 : 0

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.api_name} API Distribution"
  price_class         = var.cloudfront_price_class
  wait_for_deployment = false
  
  depends_on = [aws_lb.api, aws_lb_target_group.api]
  
  lifecycle {
    create_before_destroy = true
  }

  # ALB origin
  origin {
    domain_name = aws_lb.api.dns_name
    origin_id   = "ALB-${var.alb_name}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # Cache behavior configuration
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "ALB-${var.alb_name}"

    forwarded_values {
      query_string = true
      headers      = var.forwarded_headers
      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0  # Don't cache API responses by default
    max_ttl                = 0
    compress               = true
  }

  # API Gateway origin
  dynamic "origin" {
    for_each = var.use_api_gateway ? [1] : []
    content {
      domain_name = replace(var.api_gateway_endpoint, "/^https?:\\/\\//", "")
      origin_id   = "ApiGateway"
      
      custom_origin_config {
        http_port              = 80
        https_port             = 443
        origin_protocol_policy = "https-only"
        origin_ssl_protocols   = ["TLSv1.2"]
      }
    }
  }

  # API Gateway cache behavior
  dynamic "ordered_cache_behavior" {
    for_each = var.use_api_gateway ? [1] : []
    content {
      path_pattern     = "/api/*"
      allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods   = ["GET", "HEAD", "OPTIONS"]
      target_origin_id = "ApiGateway"

      forwarded_values {
        query_string = true
        headers      = ["Authorization", "Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"]
        cookies {
          forward = "all"
        }
      }

      viewer_protocol_policy = "redirect-to-https"
      min_ttl                = 0
      default_ttl            = 0
      max_ttl                = 0
      compress               = true
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [var.domain_name]

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.api.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}