#!/usr/bin/env bash

SCRIPT_NAME="** add_nginx"
AVAILABLE="/etc/nginx/sites-available"
ENABLED="/etc/nginx/sites-enabled"

echo "$SCRIPT_NAME: BEGIN"

cd "$APP_ROOT/script/component/nginx"

echo "$SCRIPT_NAME: install nginx"
sudo apt-get install -y nginx

echo "$SCRIPT_NAME: set up log directory"
mkdir -p "$LOG_DIR"
sudo chown -R $APP_USER:$APP_USER "$LOG_DIR"

echo "$SCRIPT_NAME: disable default site"
sudo rm -f "$ENABLED/default"

echo "$SCRIPT_NAME: END"
