# Steps

```bash
cp .env.example .env.dev
./start-mongo-db.sh
```

Go to View > Command Palette (or press Cmd+Shift+P on Mac).
Type Tasks: Run Task and select it.
Choose Run 'Start All Services' from the list of tasks.

# Steps for local prod

```bash
docker-compose -f docker-compose.local.yml --env-file .env.prod up -d
docker-compose -f docker-compose.local.yml --env-file .env.prod down
```

# Deploy on AWS

```bash
# aws ecr create-repository --repository-name gateway
docker-compose -f docker-compose.test.awsecs.yml --env-file .env.test build
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 433946623370.dkr.ecr.us-east-1.amazonaws.com
docker-compose -f docker-compose.test.awsecs.yml --env-file .env.test push

ecs-cli configure --cluster kidomo --default-launch-type FARGATE --region us-east-1 --config-name kidomo
ecs-cli compose --file docker-compose.test.awsecs.yml create --cluster-config kidomo
ecs-cli up --cluster-config kidomo compose --file docker-compose.test.awsecs.yml
ecs-cli up --cluster-config kidomo --force

aws ec2 create-security-group --group-name kidomo-security-group --description "kidomo security group" --vpc-id vpc-0dc8904ded1451957
aws ec2 authorize-security-group-ingress --group-id sg-0757a284fcbea985d --protocol tcp --port 80 --cidr 0.0.0.0/0
ecs-cli compose --file docker-compose.test.awsecs.yml --ecs-params ecs-params.yml service up --cluster-config kidomo --create-log-groups
ecs-cli compose --cluster-config kidomo service ps
```

```bash
aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document ecs-trust-policy.json
aws iam put-role-policy --role-name ecsTaskExecutionRole --policy-name ecs-task-execution-role-policy --policy-document ecs-task-execution-role-policy.json
```
