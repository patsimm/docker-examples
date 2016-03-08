#!/bin/bash

if [[ $# -ne 1 ]]; then
    echo "Illegal number of parameters"
else
    docker-compose scale webapp=$1
    docker-compose up --force-recreate -d
fi
