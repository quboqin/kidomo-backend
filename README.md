# Steps

```bash
cp .env.example .env.dev
./start-mongo-db.sh
```

Go to View > Command Palette (or press Cmd+Shift+P on Mac).
Type Tasks: Run Task and select it.
Choose Run 'Start All Services' from the list of tasks.

add the item below to your host file since other services are running out of docker network, so no dns serivce
127.0.0.1 db

# Steps for local prod

```bash
docker-compose -f docker-compose.yml --env-file .env.test up -d
docker-compose -f docker-compose.yml --env-file .env.test down
```

# Deploy on AWS

```bash
# install aws
sudo installer -pkg ./AWSCLIV2.pkg -target /
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
aws configure

# aws ecr create-repository --repository-name gateway
docker-compose -f docker-compose.yml --env-file .env.test.aws build
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 433946623370.dkr.ecr.us-east-1.amazonaws.com
docker-compose -f docker-compose.yml --env-file .env.test.aws push

brew install amazon-ecs-cli
or
sudo curl -o /usr/local/bin/ecs-cli https://amazon-ecs-cli.s3.amazonaws.com/ecs-cli-linux-amd64-latest
sudo chmod +x /usr/local/bin/ecs-cli

ecs-cli configure --cluster kidomo --default-launch-type FARGATE --region us-east-1 --config-name kidomo
ecs-cli compose --file docker-compose.awsecs.tasks.yml create --cluster-config kidomo


ssh -i ~/Downloads/mac.pem root@3.88.103.87 -p 2222

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
