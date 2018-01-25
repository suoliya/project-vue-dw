#!/usr/bin/env bash

set -e

git pull

npm install npm run build

docker-compose up -d

