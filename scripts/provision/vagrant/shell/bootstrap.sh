#!/usr/bin/env bash

# This script runs first. It updates and installs packages and, in a few places,
# echoes configuration into installed config files.

##### Mongo sources.

echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee -a /etc/apt/sources.list

##### Update Ubuntu.

sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
apt-get update -y
apt-get upgrade -y

##### Dependencies.

apt-get install build-essential automake git-core curl wget gcc g++ lib32z1-dev pkg-config libssl-dev vim less lsof -y

##### Timezone.

ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

##### N and Node.

cd /root
wget https://github.com/visionmedia/n/archive/1.2.1.tar.gz
tar xzvf 1.2.1.tar.gz
cd n-1.2.1
make install
n 0.10.12
npm install -g npm@2.0.0

##### Nginx.

apt-get install nginx -y

##### Mongo.

apt-get install mongodb-10gen -y

echo "respawn" >> /etc/init/mongodb.conf
echo "smallfiles=true" >> /etc/mongodb.conf
