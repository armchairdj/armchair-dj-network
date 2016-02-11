#!/usr/bin/env bash

echo "nginx: chowning logs"

sudo chown -R vagrant:vagrant /var/log/nginx/

echo "nginx: sudoers"

sudo cp /vagrant/scripts/setup/conf/sudoers.nginx /etc/sudoers.d/nginx && sudo chmod 0440 /etc/sudoers.d/nginx

echo "nginx: copy sites-available/node"

sudo cp /vagrant/scripts/setup/conf/nginx.site /etc/nginx/sites-available/node

echo "nginx: enable site"

sudo ln -s -f /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node
sudo rm -f /etc/nginx/sites-enabled/default

echo "nginx: restart"

sudo service nginx restart
