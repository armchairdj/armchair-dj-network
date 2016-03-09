#!/usr/bin/env bash

SCRIPT_NAME="update_node"

echo "$SCRIPT_NAME: update config"
sudo cp "$CONF_FILE_DIR/node.$NODE_ENV.conf" /etc/init/node.conf

echo "$SCRIPT_NAME: bounce"
sudo restart node
