#!/usr/bin/env bash

SCRIPT_NAME="update_node"

echo "$SCRIPT_NAME: install npm 2.0.0"
sudo npm install -g npm@2.0.0
sudo npm install -g gulp@3.9.1
sudo npm install -g browserify@13.0.0

echo "$SCRIPT_NAME: update config"
sudo cp "$CONF_FILE_DIR/node.$NODE_ENV.conf" /etc/init/node.conf

echo "$SCRIPT_NAME: bounce"
sudo restart node
