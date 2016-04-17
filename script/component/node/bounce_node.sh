#!/usr/bin/env bash

SCRIPT_NAME="** bounce_node"
FILE_PATH="$APP_ROOT/script/component/node/file"

echo "$SCRIPT_NAME: BEGIN"

echo "$SCRIPT_NAME: update config"
sudo cp "$FILE_PATH/node.$APP_ENV.conf" /etc/init/node.conf

echo "$SCRIPT_NAME: bounce"
sudo stop node
sudo start node

echo "$SCRIPT_NAME: END"
