#!/usr/bin/env bash

SCRIPT_NAME="** add_nginx"

echo "$SCRIPT_NAME: BEGIN"

cd "$APP_ROOT/script/component/nginx"

echo "$SCRIPT_NAME: install nginx and apache2-utils"
sudo apt-get install -y nginx

echo "$SCRIPT_NAME: chown logs"
sudo chown -R $APP_USER:$APP_USER /var/log/nginx/

echo "$SCRIPT_NAME: copy sites-available/node"
sudo cp "./nginx.$NODE_ENV.site" /etc/nginx/sites-available/node

echo "$SCRIPT_NAME: disable default site"
sudo rm -f /etc/nginx/sites-enabled/default

echo "$SCRIPT_NAME: enable site"
sudo ln -s -f /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node

echo "$SCRIPT_NAME: start"
sudo service nginx start

echo "$SCRIPT_NAME: END"
