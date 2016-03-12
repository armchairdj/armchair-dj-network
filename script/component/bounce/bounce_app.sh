#!/usr/bin/env bash

SCRIPT_NAME="update_app"

cd "$APP_ROOT"

echo "$SCRIPT_NAME: git pull"
git pull

echo "$SCRIPT_NAME: npm install"
npm install

echo "$SCRIPT_NAME: restart node"
sudo restart node

echo "check for migrations or other release tasks!"
