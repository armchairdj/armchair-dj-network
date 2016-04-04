#!/usr/bin/env bash

SCRIPT_NAME="** bounce_node"

echo "$SCRIPT_NAME: BEGIN"

cd "$APP_ROOT/script/component/node"

echo "$SCRIPT_NAME: update config"
sudo cp "./node.$APP_ENV.conf" /etc/init/node.conf

echo "$SCRIPT_NAME: bounce"
sudo stop node
sudo start node

echo "$SCRIPT_NAME: END"
