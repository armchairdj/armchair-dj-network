#!/usr/bin/env bash

# This script runs first. It updates and installs packages and, in a few places,
# echoes configuration into installed config files.

##### Mongo sources.

echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee -a /etc/apt/sources.list

##### Update Ubuntu.

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
apt-get update -y
apt-get upgrade -y

##### Dependencies.

apt-get install build-essential automake git-core curl dkms wget gcc g++ lib32z1-dev pkg-config libssl-dev vim less lsof -y

##### Timezone.

ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

##### N and Node.

cd /root
wget https://github.com/tj/n/archive/v2.1.0.tar.gz
tar xzvf 2.1.0.tar.gz
cd n-2.1.0
make install
n 4.2.6
npm install -g npm@2.0.0

##### Nginx.

apt-get install nginx -y

##### Mongo.

echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

sudo apt-get install -y mongodb-org

sudo echo "respawn" >> /etc/init/mongodb.conf
sudo echo "smallfiles=true" >> /etc/mongodb.conf

##### Puppet.

wget https://apt.puppetlabs.com/puppetlabs-release-trusty.deb
sudo dpkg -i puppetlabs-release-trusty.deb
sudo apt-get update
sudo apt-get install puppet
sudo puppet resource service puppet ensure=running enable=true
