#!/bin/sh
echo $0
DIR=$(cd $(dirname $0); pwd)
echo $DIR
cd $DIR

docker container stop chiloportfolio 2>&1 || true
docker compose -f docker-compose.production.yml build
docker compose -f docker-compose.production.yml up -d