#!/usr/bin/env bash

SCRIPT_NAME="setup_mongo"

echo "$SCRIPT_NAME: sources"
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
apt-get update -y

echo "$SCRIPT_NAME: install"
sudo apt-get install -y mongodb-org

echo "$SCRIPT_NAME: copy sudoers"
sudo cp "$APP_ROOT/scripts/tasks/setup/conf/mongo.sudoers" /etc/sudoers.d/mongo && sudo chmod 0440 /etc/sudoers.d/mongo

echo "$SCRIPT_NAME: configuration"
sudo echo "respawn" >> /etc/init/mongodb.conf
sudo echo "smallfiles=true" >> /etc/init/mongodb.conf
