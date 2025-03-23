#!/bin/bash

aws sso login --profile dflint
export AWS_PROFILE=dflint
terraform init
if [ -n "$1" ]; then
  terraform workspace select "${1}"
  terraform apply -var-file="./environments/${1}.tfvars"
else
  echo "no environment passed"
fi
