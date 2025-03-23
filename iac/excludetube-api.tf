###############################################
# ExcludeTube API - API Gateway with ALB
###############################################

module "excludetube_api" {
  source = "./modules/api-gateway"

  api_name    = "ExcludeTube"
  alb_name    = "excludetube-api-alb"
  domain_name = "api.excludetube.com"

  vpc_id     = aws_vpc.main.id
  subnet_ids = aws_subnet.public[*].id

  container_port      = 8080
  health_check_path   = "/"  # GraphQL playground is at root

  use_cloudfront      = true

  # Headers to forward to the origin
  forwarded_headers   = [
    "Authorization",
    "Host",
    "Origin",
    "Referer",
    "User-Agent",
    "X-Forwarded-For"
  ]
}


# ECS Task Definition for ExcludeTube API
resource "aws_ecs_task_definition" "excludetube_api" {
  family                   = "${var.project_name}-excludetube-api"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  memory                   = 128
  cpu                      = 256
  container_definitions = jsonencode([
    {
      name      = "excludetube-api"
      image     = "${aws_ecr_repository.main.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "ENV",
          value = "production"
        }
      ],
      healthCheck = {
        command     = ["CMD-SHELL", "wget --no-verbose --spider http://localhost:8080 || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 10
      }
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.excludetube_api.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "excludetube-api"
        }
      }
    }
  ])
}

# ECS Service for ExcludeTube API
resource "aws_ecs_service" "excludetube_api" {
  name            = "${var.project_name}-excludetube-api"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.excludetube_api.arn
  desired_count   = 1
  launch_type     = "EC2"

  depends_on = [
    aws_autoscaling_group.ecs
  ]
}

###############################################
# ASG Attachment to Target Group
###############################################

resource "aws_autoscaling_attachment" "asg_attachment" {
  autoscaling_group_name = aws_autoscaling_group.ecs.name
  lb_target_group_arn    = module.excludetube_api.target_group_arn

  # Add explicit dependency on the target group and ALB
  depends_on = [module.excludetube_api]

  # Add lifecycle policy to handle changes gracefully
  lifecycle {
    create_before_destroy = true
  }
}


###############################################
# Route 53 Records for ExcludeTube API
###############################################

resource "aws_route53_record" "excludetube_api" {
  zone_id = data.aws_route53_zone.excludetube.zone_id
  name    = "api.excludetube.com"
  type    = "A"

  alias {
    name                   = module.excludetube_api.use_cloudfront ? module.excludetube_api.cloudfront_distribution_domain_name : module.excludetube_api.alb_dns_name
    zone_id                = module.excludetube_api.use_cloudfront ? "Z2FDTNDATAQYW2" : module.excludetube_api.alb_zone_id  # CloudFront or ALB zone ID
    evaluate_target_health = false
  }
}

###############################################
# Certificate Validation for ExcludeTube API
###############################################

resource "aws_route53_record" "excludetube_api_validation" {
  for_each = {
    for dvo in module.excludetube_api.acm_certificate_validation_domains : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.excludetube.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "excludetube_api" {
  certificate_arn         = module.excludetube_api.acm_certificate_arn
  validation_record_fqdns = [for record in aws_route53_record.excludetube_api_validation : record.fqdn]
}
