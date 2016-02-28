#!/usr/bin/env bash

SCRIPT_NAME="setup_node"

echo "$SCRIPT_NAME: install n"
cd "$APP_USER_HOME"
mkdir -p tmp/
cd tmp
wget https://github.com/tj/n/archive/v2.1.0.tar.gz
tar xzvf v2.1.0.tar.gz
cd n-2.1.0
sudo make install

echo "$SCRIPT_NAME: install node 4.2.6"
sudo n 4.2.6

echo "$SCRIPT_NAME: sudoers"
sudo cp "$CONF_FILE_DIR/node.sudoers" /etc/sudoers.d/node && sudo chmod 0440 /etc/sudoers.d/node
