output "alb_dns_name" {
  description = "DNS name of the ALB"
  value       = aws_lb.api.dns_name
}

output "alb_arn" {
  description = "ARN of the ALB"
  value       = aws_lb.api.arn
}

output "target_group_arn" {
  description = "ARN of the ALB target group"
  value       = aws_lb_target_group.api.arn
}

output "security_group_id" {
  description = "ID of the ALB security group"
  value       = aws_security_group.alb.id
}

output "acm_certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.api.arn
}

output "acm_certificate_validation_domains" {
  description = "Domain validation options for the ACM certificate"
  value       = aws_acm_certificate.api.domain_validation_options
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = var.use_cloudfront ? aws_cloudfront_distribution.api[0].id : null
}

output "cloudfront_distribution_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = var.use_cloudfront ? aws_cloudfront_distribution.api[0].domain_name : null
}

output "use_cloudfront" {
  description = "Whether CloudFront is being used"
  value       = var.use_cloudfront
}

output "alb_zone_id" {
  description = "The canonical hosted zone ID of the ALB"
  value       = aws_lb.api.zone_id
}