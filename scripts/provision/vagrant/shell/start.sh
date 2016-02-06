#!/usr/bin/env bash

# This script runs last, after bootstrap.sh and after we've copied a ton of
# bash and config files to their proper locations.

##### Mongo.

stop mongodb
start mongodb

##### Nginx.

ln -s /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node
rm -f /etc/nginx/sites-enabled/default

/etc/init.d/nginx restart
