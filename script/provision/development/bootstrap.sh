#!/usr/bin/env bash

SCRIPT_NAME='ubuntu'
CONF_FILE_DIR='/vagrant/script/task/file'
HOME='/home/vagrant'
NODE_ENV='development'
APP_ROOT='/vagrant'

##### Ubuntu.

echo "$SCRIPT_NAME: set timezone"
ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

echo "$SCRIPT_NAME: update sources"
apt-get update -y

echo "$SCRIPT_NAME: upgrade os"
apt-get upgrade -y

echo "$SCRIPT_NAME: install packages"
apt-get install build-essential automake git-core curl dkms wget gcc g++ lib32z1-dev pkg-config libssl-dev vim less lsof -y

##### Set up environment variables.

echo "$SCRIPT_NAME: copy command prompt"
cp "$CONF_FILE_DIR/command_prompt.bash" "$HOME/.command_prompt"

echo "$SCRIPT_NAME: copy environment variables"
cp "$CONF_FILE_DIR/environment_vars.$NODE_ENV.bash" "$HOME/.environment_vars"

echo "$SCRIPT_NAME: copy profile"
cp "$CONF_FILE_DIR/profile.bash" "$HOME/.profile"

echo "$SCRIPT_NAME: source updated files"
source "$HOME/.profile"

##### Now we can run everything else

echo "ubuntu: run setup script"
# sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/setup.sh"
