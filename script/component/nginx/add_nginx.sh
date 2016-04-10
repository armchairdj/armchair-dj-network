#!/usr/bin/env bash

SCRIPT_NAME="** add_nginx"
AVAILABLE="/etc/nginx/sites-available"
ENABLED="/etc/nginx/sites-enabled"

echo "$SCRIPT_NAME: BEGIN"

cd "$APP_ROOT/script/component/nginx"

echo "$SCRIPT_NAME: install nginx"
sudo apt-get install -y nginx

echo "$SCRIPT_NAME: chown logs"
sudo chown -R $APP_USER:$APP_USER /var/log/nginx/

echo "$SCRIPT_NAME: disable default site"
sudo rm -f "$ENABLED/default"

echo "$SCRIPT_NAME: END"
