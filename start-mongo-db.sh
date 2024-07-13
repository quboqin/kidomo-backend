#!/bin/bash
# Function to stop docker-compose services
cleanup() {
  echo "Stopping docker-compose services..."
  docker-compose -f docker-compose.db.yml --env-file .env.dev down
  exit 0
}

# Trap SIGINT (Ctrl-C) and call cleanup function
trap 'cleanup' SIGINT

# Check for --delete-db argument
if [ "$1" == "--delete-db" ]; then
  echo "Deleting db/data folder..."
  rm -rf db/data
fi

docker-compose -f docker-compose.db.yml --env-file .env.dev up -d 

# services=("user" "task" "mailer" "permission" "token" "gateway")
# for service in "${services[@]}"; do
#   echo "Now starting service: $service..."
#   (cd "$service" && nohup npm run start:dev >> ../nohup.out &)
# done

wait
echo "All services have been started."

# Keep script running until Ctrl-C is pressed
while true; do
  sleep 1
done