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
- ExcludeTube API ECS Service
- SSH Key Pair (private key stored locally)

## Usage

You can use the provided deploy script which handles the Terraform commands and optionally builds/pushes the Docker image:

```bash
# Make the script executable if needed
chmod +x deploy.sh

# Run the deploy script
./deploy.sh

# Run with a specific region
./deploy.sh --region us-west-2
```

Or run the Terraform commands manually:

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
# Login to ECR (note: use just the registry URL, not the full repository URL)
ECR_REGISTRY=<account-id>.dkr.ecr.us-east-1.amazonaws.com
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY

# Build and tag your image
cd ../excludetube-api
docker build -t excludetube-api .
docker tag excludetube-api:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/blortfish-ecr:latest

# Push the image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/blortfish-ecr:latest
```

## Updating the ECS Service

After pushing a new image, update the ECS service to use it:

```bash
aws ecs update-service --cluster blortfish-cluster --service blortfish-excludetube-api --force-new-deployment
```

## ExcludeTube API

The infrastructure is configured to run the ExcludeTube API, a GraphQL service. The API:

- Is containerized using Docker (see `../excludetube-api/Dockerfile`)
- Runs on port 8080 internally, mapped to port 80 externally
- Provides a GraphQL endpoint at `/query`
- Provides a GraphQL playground at the root path `/`

You can test the API after deployment by visiting:
- http://[EC2-INSTANCE-PUBLIC-IP]/