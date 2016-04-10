#!/usr/bin/env bash

SCRIPT_NAME="** add_bash"

echo "$SCRIPT_NAME: BEGIN"

echo "$SCRIPT_NAME: chown app user home directory /home/$APP_USER"
sudo chown -R "$APP_USER:$APP_USER" "/home/$APP_USER"

echo "$SCRIPT_NAME: END"
