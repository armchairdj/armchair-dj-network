#!/usr/bin/env bash

SCRIPT_NAME="bounce_mongo"

echo "$SCRIPT_NAME: restart"
sudo service mongod restart
