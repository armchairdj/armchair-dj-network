#!/usr/bin/env bash

SCRIPT_NAME="update_mongo"

echo "$SCRIPT_NAME: restart"
sudo stop mongodb
sudo start mongodb
