#!/bin/sh
echo $0
DIR=$(cd $(dirname $0); pwd)
echo $DIR
cd $DIR

if docker ps -q --filter "name=^chiloportfolio$" | grep -q .; then
    echo "Stopping existing container: chiloportfolio"
    docker container stop chiloportfolio
fi
