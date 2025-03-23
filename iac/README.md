# Blortfish ECS Infrastructure

This directory contains Terraform configurations for provisioning an AWS ECS cluster with an Auto Scaling Group.

## Resources Created

- VPC with public subnets
- Internet Gateway and Route Tables
- Security Group for ECS instances
- IAM Roles for ECS
- ECS Cluster
- Auto Scaling Group (1 desired, 1 min, 1 max)
- ECR Repository
- Hello World ECS Service
- SSH Key Pair (private key stored locally)

## Usage

```bash
# Initialize Terraform
terraform init

# Plan the deployment
terraform plan -out=tfplan

# Apply the changes
terraform apply tfplan

# Destroy the infrastructure when finished
terraform destroy
```

## Accessing Instances

After deploying, you can use the generated private key to SSH into the instances:

```bash
chmod 600 blortfish-key.pem
ssh -i blortfish-key.pem ec2-user@<instance-public-ip>
```

## Deploying to ECR

To push images to the ECR repository:

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag your image
docker build -t blortfish-ecr .
docker tag blortfish-ecr:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/blortfish-ecr:latest

# Push the image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/blortfish-ecr:latest
```

## Updating the ECS Service

After pushing a new image, update the ECS service to use it:

```bash
aws ecs update-service --cluster blortfish-cluster --service blortfish-hello-world --force-new-deployment
```