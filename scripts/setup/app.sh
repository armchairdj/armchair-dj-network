#!/usr/bin/env bash

cd /vagrant

echo "app: stop node"

sudo node stop

echo "app: remove node_modules"

sudo rm -rf ./node_modules

echo "app: npm package.json"

npm install

echo "app: npm global"

sudo npm install -g gulp
sudo npm install -g grunt-cli
