#!/bin/bash
#

set -e

# Check for region override
if [ "$1" = "--region" ]; then
  export AWS_DEFAULT_REGION="$2"
  echo "Using specified region: $AWS_DEFAULT_REGION"
  shift 2
fi

aws sso login --profile dflint
export AWS_PROFILE=dflint

echo "Initializing Terraform..."
terraform init
terraform workspace select prd

echo "Planning Terraform deployment..."
terraform plan -out=tfplan

echo "Applying Terraform plan..."
terraform apply tfplan

echo "Terraform deployment complete!"
echo "ECS Cluster is now available. Private key has been saved locally."

# Output the ECR repository URL
ECR_REPO_URL=$(terraform output -raw ecr_repository_url)
echo "ECR Repository URL: $ECR_REPO_URL"

# Ask if user wants to build and push the Docker image
read -p "Do you want to build and push the Docker image for excludetube-api? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # Debug: Print AWS profile
  echo "Using AWS Profile: $AWS_PROFILE"
  
  # Get AWS account ID and verify credentials
  echo "Verifying AWS credentials..."
  if ! AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text); then
    echo "Error: Failed to get AWS account ID. Check your AWS credentials."
    echo "Try running 'aws sso login --profile dflint' again."
    exit 1
  fi
  
  echo "AWS Account ID: $AWS_ACCOUNT_ID"
  AWS_REGION=$(aws configure get region)
  if [ -z "$AWS_REGION" ]; then
    AWS_REGION="us-west-2"  # Setting a default region
    echo "AWS Region not configured, defaulting to $AWS_REGION"
  else
    echo "AWS Region: $AWS_REGION"
  fi
  
  echo "Building Docker image..."
  cd ../excludetube-api
  docker build -t excludetube-api:latest .
  
  echo "Tagging Docker image..."
  docker tag excludetube-api:latest $ECR_REPO_URL:latest
  
  echo "Logging in to ECR..."
  # Extract the registry URL (without the repository name)
  ECR_REGISTRY=$(echo $ECR_REPO_URL | cut -d'/' -f1)
  echo "ECR Registry URL: $ECR_REGISTRY"
  
  # Check if ECR repository exists
  echo "Checking if ECR repository exists..."
  REPO_NAME=$(basename $ECR_REPO_URL)
  if ! aws ecr describe-repositories --repository-names $REPO_NAME --region $AWS_REGION 2>/dev/null; then
    echo "Warning: ECR repository does not exist yet."
    read -p "Do you want to create the ECR repository manually? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      echo "Creating ECR repository..."
      if aws ecr create-repository --repository-name $REPO_NAME --region $AWS_REGION; then
        echo "ECR repository created successfully."
      else
        echo "Failed to create ECR repository. Proceeding anyway..."
      fi
    else
      echo "Skipping repository creation. It will be created during Terraform apply."
    fi
  else
    echo "ECR repository exists."
  fi
  
  # Try to log in with explicit region
  echo "Attempting ECR login..."
  if ! aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY; then
    echo "Error: ECR login failed. Try running this command manually:"
    echo "aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY"
    exit 1
  fi
  
  echo "Pushing Docker image to ECR..."
  docker push $ECR_REPO_URL:latest
  
  echo "Updating ECS service..."
  CLUSTER_NAME="blortfish-cluster"
  SERVICE_NAME="blortfish-excludetube-api"
  
  # Skip Terraform output and use hardcoded values
  echo "Using cluster name: $CLUSTER_NAME"
  echo "Using service name: $SERVICE_NAME"
  
  aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --force-new-deployment --region $AWS_REGION
  
  echo "Docker image deployed to ECR and ECS service updated!"
fi
