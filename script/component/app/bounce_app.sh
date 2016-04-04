#!/usr/bin/env bash

SCRIPT_NAME="** bounce_app"

echo "$SCRIPT_NAME: BEGIN"

cd "$APP_ROOT"

if [ "$APP_ENV" == "linode" ]; then
  echo "$SCRIPT_NAME: git pull"
  git pull
fi

echo "$SCRIPT_NAME: npm install"
npm install

echo "$SCRIPT_NAME: restart node"
sudo restart node

echo "$SCRIPT_NAME: check for migrations or other release tasks!"

echo "$SCRIPT_NAME: END"
