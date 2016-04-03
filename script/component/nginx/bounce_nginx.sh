#!/usr/bin/env bash

SCRIPT_NAME="** bounce_nginx"

echo "$SCRIPT_NAME: copy sites-available/node"
sudo cp "$CONF_FILE_DIR/nginx.$NODE_ENV.site" /etc/nginx/sites-available/node

echo "$SCRIPT_NAME: restart"
sudo service nginx restart
