variable "site_name" {
  description = "Name of the site, used for tagging resources"
  type        = string
}

variable "bucket_name" {
  description = "Name of the S3 bucket to create"
  type        = string
}

variable "domain_names" {
  description = "List of domain names for the site (first one is primary)"
  type        = list(string)
}

variable "enable_versioning" {
  description = "Enable versioning for the S3 bucket"
  type        = bool
  default     = true
}

variable "is_spa" {
  description = "Set to true if the site is a Single Page Application"
  type        = bool
  default     = true
}

variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100" # US and Europe only (cheapest)
}

variable "min_ttl" {
  description = "Minimum time to live for cached objects"
  type        = number
  default     = 0
}

variable "default_ttl" {
  description = "Default time to live for cached objects"
  type        = number
  default     = 3600
}

variable "max_ttl" {
  description = "Maximum time to live for cached objects"
  type        = number
  default     = 86400
}