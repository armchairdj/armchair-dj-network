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

source "/vagrant/scripts/tasks/files/environment_vars.development.bash"

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/setup.sh"
