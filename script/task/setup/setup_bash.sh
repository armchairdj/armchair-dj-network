#!/usr/bin/env bash

SCRIPT_NAME="setup_bash"

echo "$SCRIPT_NAME: chown vagrant user home directory $APP_USER_HOME"
sudo chown -R "$APP_USER:$APP_USER" "$APP_USER_HOME"
