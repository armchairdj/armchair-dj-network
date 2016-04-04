#!/usr/bin/env bash

SCRIPT_NAME="** add_node"

echo "$SCRIPT_NAME: BEGIN"

cd "/home/$APP_USER"

echo "$SCRIPT_NAME: install n"
mkdir -p src
cd src
wget https://github.com/tj/n/archive/v2.1.0.tar.gz
tar xzvf v2.1.0.tar.gz
cd n-2.1.0
sudo make install

echo "$SCRIPT_NAME: chown /usr/local so we don't need sudo to install global npm modules"
sudo chown -R "$APP_USER:$APP_USER" /usr/local

echo "$SCRIPT_NAME: install node 4.2.6"
n 4.2.6

echo "$SCRIPT_NAME: install npm 2.0.0"
npm install -g npm@2.15.1
npm install -g gulp@3.9.1
npm install -g browserify@13.0.0

echo "$SCRIPT_NAME: END"
