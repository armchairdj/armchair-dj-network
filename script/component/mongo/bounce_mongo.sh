#!/usr/bin/env bash

SCRIPT_NAME="** bounce_mongo"
FILE_PATH="$APP_ROOT/script/component/mongo/file"

echo "$SCRIPT_NAME: BEGIN"

echo "$SCRIPT_NAME: stop mongo"
sudo service mongod stop

# Copied in add_mongo
echo "$SCRIPT_NAME: copy mongod upstart script"
sudo cp "$FILE_PATH/mongod.conf" /etc/init/mongod.conf

# Copied in add_mongo
echo "$SCRIPT_NAME: copy mongod yml configuration file"
sudo cp "$FILE_PATH/mongod.yml" /etc/mongod.conf

echo "$SCRIPT_NAME: start mongo"
sudo service mongod start

echo "$SCRIPT_NAME: END"
