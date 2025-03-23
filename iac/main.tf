terraform {
  backend "s3" {
    bucket = "tf-infra-backend"
    key = "danielflint"
    region = "us-east-1"
  }
}
