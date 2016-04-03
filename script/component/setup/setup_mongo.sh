#!/usr/bin/env bash

SCRIPT_NAME="setup_mongo"
MONGO_VERSION="3.2.1"

echo "$SCRIPT_NAME: sources"
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
sudo apt-get update -y

echo "$SCRIPT_NAME: install"
sudo apt-get install -y "mongodb-org=$MONGO_VERSION" "mongodb-org-server=$MONGO_VERSION" "mongodb-org-shell=$MONGO_VERSION" "mongodb-org-mongos=$MONGO_VERSION" "mongodb-org-tools=$MONGO_VERSION"

echo "$SCRIPT_NAME: pin"
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

echo "$SCRIPT_NAME: disable transparent hugepages"
sudo cp "$APP_ROOT/script/component/file/disable-transparent-hugepages.conf" /etc/init.d/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
/etc/init.d/disable-transparent-hugepages

echo "$SCRIPT_NAME: copy mongod upstart script"
sudo cp "$APP_ROOT/script/component/file/mongod.conf" /etc/init/mongod.conf
sudo chmod +x /etc/init/mongod.conf

echo "$SCRIPT_NAME: copy mongod yml configuration file"
sudo cp "$APP_ROOT/script/component/file/mongod.yml" /etc/mongod.conf
sudo chmod +x /etc/mongod.conf
