#!/usr/bin/env bash

SCRIPT_NAME="** add_mongo"
MONGO_VERSION="3.2.1"

echo "$SCRIPT_NAME: BEGIN"

cd "$APP_ROOT/script/component/mongo"

echo "$SCRIPT_NAME: sources"
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
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
sudo cp "./disable-transparent-hugepages.conf" /etc/init.d/disable-transparent-hugepages
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
/etc/init.d/disable-transparent-hugepages

if [ "$APP_ENV" == "linode" ]; then
  echo "$SCRIPT_NAME: do not remove existing data in linode"
else
  echo "$SCRIPT_NAME: stop mongo to remove existing data"
  sudo service mongod stop

  echo "$SCRIPT_NAME: remove existing data"
  sudo rm -rf /var/lib/mongodb/*

  # deliberately copied from bounce_mongo
  echo "$SCRIPT_NAME: copy mongod upstart script"
  sudo cp "./mongod.conf" /etc/init/mongod.conf

  # deliberately copied from bounce_mongo
  echo "$SCRIPT_NAME: copy mongod yml configuration file"
  sudo cp "./mongod.yml" /etc/mongod.conf

  echo "$SCRIPT_NAME: restart mongo after removing existing data and swapping config"
  sudo service mongod start
fi

echo "$SCRIPT_NAME: END"
