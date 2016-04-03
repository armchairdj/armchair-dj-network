#!/usr/bin/env bash

SCRIPT_NAME="** add_node"

echo "$SCRIPT_NAME: install n"
cd "$APP_USER_HOME"
mkdir -p src
cd src
wget https://github.com/tj/n/archive/v2.1.0.tar.gz
tar xzvf v2.1.0.tar.gz
cd n-2.1.0
sudo make install

echo "$SCRIPT_NAME: install node 4.2.6"
sudo n 4.2.6

echo "$SCRIPT_NAME: install npm 2.0.0"
sudo npm install -g npm@2.0.0
sudo npm install -g gulp@3.9.1
sudo npm install -g browserify@13.0.0
