#!/bin/bash
#

set -e
aws sso login --profile dflint
export AWS_PROFILE=dflint

echo "Initializing Terraform..."
terraform init
terraform workspace select prd

echo "Planning Terraform deployment..."
terraform plan -out=tfplan

echo "Applying Terraform plan..."
terraform apply tfplan

echo "Deployment complete!"
echo "ECS Cluster is now available. Private key has been saved locally."

# Output the ECR repository URL
echo "ECR Repository URL: $(terraform output -raw ecr_repository_url)"
