#!/usr/bin/env bash

SCRIPT_NAME="** bounce_mongo"

echo "$SCRIPT_NAME: BEGIN"

cd "$APP_ROOT/script/component/mongo"

echo "$SCRIPT_NAME: stop mongo"
sudo service mongod stop

echo "$SCRIPT_NAME: copy mongod upstart script"
sudo cp "./mongod.conf" /etc/init/mongod.conf

echo "$SCRIPT_NAME: copy mongod yml configuration file"
sudo cp "./mongod.yml" /etc/mongod.conf

echo "$SCRIPT_NAME: start mongo"
sudo service mongod start

echo "$SCRIPT_NAME: END"
