# ExcludeTube API

GraphQL API for the ExcludeTube application.

## Local Development

### Using Docker

Build and run the API using Docker:

```bash
docker build -t excludetube-api .
docker run -p 8080:8080 excludetube-api
```

Or using Docker Compose:

```bash
docker-compose up --build
```

The API will be available at http://localhost:8080.

### Without Docker

```bash
# Install dependencies
go mod download

# Run the API
go run server.go
```

## Deployment to ECS

You can deploy to ECS in one of two ways:

### Using the IAC Deploy Script

The main deployment script in the `iac` directory handles both infrastructure provisioning and Docker image deployment:

```bash
cd ../iac
./deploy.sh
```

This will:
1. Deploy the infrastructure with Terraform
2. Optionally build and push the Docker image
3. Update the ECS service

### Manual Deployment

1. Build the Docker image:
   ```bash
   docker build -t excludetube-api .
   ```

2. Tag the image for your ECR repository:
   ```bash
   docker tag excludetube-api:latest [AWS_ACCOUNT_ID].dkr.ecr.[REGION].amazonaws.com/blortfish-ecr:latest
   ```

3. Login to ECR (note: use just the registry URL, not the full repository URL):
   ```bash
   ECR_REGISTRY=[AWS_ACCOUNT_ID].dkr.ecr.[REGION].amazonaws.com
   aws ecr get-login-password --region [REGION] | docker login --username AWS --password-stdin $ECR_REGISTRY
   ```

4. Push the image to ECR:
   ```bash
   docker push [AWS_ACCOUNT_ID].dkr.ecr.[REGION].amazonaws.com/blortfish-ecr:latest
   ```

5. Update the ECS service to use the new image:
   ```bash
   aws ecs update-service --cluster blortfish-cluster --service blortfish-excludetube-api --force-new-deployment
   ```

## API Endpoints

- GraphQL Playground: http://localhost:8080/
- GraphQL API: http://localhost:8080/query