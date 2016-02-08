#!/usr/bin/env bash

cd /vagrant

echo "app: stop node"

node stop

echo "app: remove node_modules"

rm -rf ./node_modules

echo "app: npm package.json"

npm install

echo "app: npm global"

npm install -g gulp
npm install -g grunt-cli
