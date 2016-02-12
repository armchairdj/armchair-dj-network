#!/usr/bin/env bash

##### Ubuntu.

echo "ubuntu: set timezone"
ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

echo "ubuntu: update sources"
apt-get update -y

echo "ubuntu: upgrade os"
apt-get upgrade -y

echo "ubuntu: install packages"
apt-get install build-essential automake git-core curl dkms wget gcc g++ lib32z1-dev pkg-config libssl-dev vim less lsof -y

##### Bootstrap.

echo "ubuntu: load environment vars"
# source "/vagrant/script/task/file/environment_vars.development.bash"

echo "ubuntu: run setup script"
# sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/setup.sh"
