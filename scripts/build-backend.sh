#!/usr/bin/bash
echo "Building web..."
CWD=$(pwd)
DOCKER_COMPOSE_FILE=$CWD/deploy/backend/docker-compose-backend.yml

# Build the web container
#  Check if the docker-compose-web.yml file exists
if [ -f $DOCKER_COMPOSE_FILE ]; then
  #  If it exists, run the docker-compose command to build the web container
  docker compose -f $DOCKER_COMPOSE_FILE up --build -d
else
  #  If it does not exist, print an error message
  echo "Error: $DOCKER_COMPOSE_FILE does not exist"
fi