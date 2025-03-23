variable "api_name" {
  description = "Name of the API, used for tagging resources"
  type        = string
}

variable "alb_name" {
  description = "Name of the Application Load Balancer"
  type        = string
}

variable "domain_name" {
  description = "Domain name for the API"
  type        = string
}

variable "vpc_id" {
  description = "ID of the VPC where resources will be created"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs where the ALB will be created"
  type        = list(string)
}

variable "container_port" {
  description = "Port that the container is listening on"
  type        = number
  default     = 8080
}

variable "health_check_path" {
  description = "Path for the health check"
  type        = string
  default     = "/"
}

variable "enable_deletion_protection" {
  description = "Enable deletion protection for the ALB"
  type        = bool
  default     = false
}

variable "use_cloudfront" {
  description = "Whether to use CloudFront in front of the ALB"
  type        = bool
  default     = true
}

variable "use_api_gateway" {
  description = "Whether to use API Gateway for the /api path"
  type        = bool
  default     = false
}

variable "api_gateway_endpoint" {
  description = "Endpoint URL for API Gateway (if used)"
  type        = string
  default     = ""
}

variable "forwarded_headers" {
  description = "List of headers to forward to the origin"
  type        = list(string)
  default     = ["Authorization", "Host", "Origin", "Referer", "User-Agent", "X-Forwarded-For"]
}

variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100" # US and Europe only (cheapest)
}

variable "target_ids" {
  description = "List of target IDs to attach to the target group (e.g., EC2 instance IDs)"
  type        = list(string)
  default     = []
}