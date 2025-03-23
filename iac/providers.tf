###############################################
# AWS Provider Configuration
###############################################

# CloudFront certificates must be in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

###############################################
# Route 53 Zone Data Sources
###############################################

data "aws_route53_zone" "excludetube" {
  name = "excludetube.com."
}

data "aws_route53_zone" "portfolio" {
  name = "danielflint.com."
}
