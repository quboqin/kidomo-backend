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
docker-compose -f docker-compose.yml --env-file .env.test --env-file env up -d
docker-compose -f docker-compose.yml --env-file .env.test --env-file env down
```

# Deploy on AWS

```bash
# install aws
sudo installer -pkg ./AWSCLIV2.pkg -target /
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
aws configure

# aws ecr create-repository --repository-name gateway
cp env.aws.example .env.aws
docker-compose -f docker-compose.yml --env-file .env.test --env-file .env.aws --env-file env build
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 433946623370.dkr.ecr.us-east-1.amazonaws.com
docker-compose -f docker-compose.yml --env-file .env.test --env-file .env.aws --env-file env push

brew install amazon-ecs-cli

sudo curl -o /usr/local/bin/ecs-cli https://amazon-ecs-cli.s3.amazonaws.com/ecs-cli-linux-amd64-latest
sudo chmod +x /usr/local/bin/ecs-cli

cat env >> .env.test
ecs-cli configure --cluster kidomo --default-launch-type FARGATE --region us-east-1 --config-name kidomo
ecs-cli compose --file docker-compose.awsecs.tasks.yml create --cluster-config kidomo
ecs-cli compose --file docker-compose.awsecs.tasks.yml --ecs-params ecs-params.yml --cluster-config kidomo service up --create-log-groups
ecs-cli compose --cluster-config kidomo service ps
```

SSH_PRIVATE_KEY
