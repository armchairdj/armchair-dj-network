#!/usr/bin/env bash

SCRIPT_NAME="** add_app"

cd "$APP_ROOT"

echo "$SCRIPT_NAME: stop node"
sudo stop node

echo "$SCRIPT_NAME: remove node_modules"
rm -rf ./node_modules
