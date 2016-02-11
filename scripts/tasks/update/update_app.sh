#!/usr/bin/env bash

cd /vagrant

echo "app: stop node"
sudo stop node

echo "app: remove node_modules"
rm -rf ./node_modules

echo "app: npm package.json"
npm install

echo "app: npm global"
sudo npm install -g gulp
