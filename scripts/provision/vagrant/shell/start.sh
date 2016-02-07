#!/usr/bin/env bash

# This script runs last, after bootstrap.sh and after we've copied a ton of
# bash and config files to their proper locations.

##### Vagrant user

sudo chown -R vagrant:vagrant /home/vagrant

##### Mongo

sudo stop mongodb
sudo start mongodb

##### Set up app.

cd /vagrant
rm -rf ./node_modules
npm install
sudo npm install -g gulp

##### Nginx.

ln -s /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node
rm -f /etc/nginx/sites-enabled/default

sudo /etc/init.d/nginx restart
