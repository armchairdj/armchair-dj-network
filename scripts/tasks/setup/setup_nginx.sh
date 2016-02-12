#!/usr/bin/env bash

SCRIPT_NAME="setup_nginx"

echo "$SCRIPT_NAME: install"
apt-get install -y nginx

echo "$SCRIPT_NAME: chown logs"
sudo chown -R vagrant:vagrant /var/log/nginx/

echo "$SCRIPT_NAME: copy sudoers"
sudo cp "$CONF_FILE_DIR/nginx.sudoers" /etc/sudoers.d/nginx && sudo chmod 0440 /etc/sudoers.d/nginx

echo "$SCRIPT_NAME: copy sites-available/node"
sudo cp "$CONF_FILE_DIR/nginx.site" /etc/nginx/sites-available/node

echo "$SCRIPT_NAME: disable default site"
sudo rm -f /etc/nginx/sites-enabled/default

echo "$SCRIPT_NAME: enable site"
sudo ln -s -f /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node

echo "$SCRIPT_NAME: start"
sudo service nginx start
