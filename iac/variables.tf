variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name to use for resource naming"
  type        = string
  default     = "blortfish"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "key_name" {
  description = "Name of the SSH key pair"
  type        = string
  default     = "blortfish-key"
}

variable "ami_id" {
  description = "Amazon ECS-optimized AMI ID"
  type        = string
  default     = "ami-0fe77b349d804e9e6" # Amazon ECS-optimized Amazon Linux 2 AMI in us-east-1
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ecr_repository_name" {
  description = "Name of the ECR repository"
  type        = string
  default     = "blortfish-ecr"
}