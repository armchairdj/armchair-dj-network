#!/usr/bin/env bash

SCRIPT_NAME="bounce_app"

cd "$APP_ROOT"

if [ "$APP_ENV" == "linode" ]; then;
  echo "$SCRIPT_NAME: git pull"
  git pull
fi

echo "$SCRIPT_NAME: npm install"
npm install

echo "$SCRIPT_NAME: restart node"
sudo restart node

echo "check for migrations or other release tasks!"
