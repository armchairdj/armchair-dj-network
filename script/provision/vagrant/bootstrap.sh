#!/usr/bin/env bash

SCRIPT_NAME="** vagrant_bootstrap"

NODE_ENV="development"
APP_ROOT="/vagrant"
APP_USER="vagrant"

##### Ubuntu.

echo "$SCRIPT_NAME: set timezone"
ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

echo "$SCRIPT_NAME: update sources"
apt-get update -y

echo "$SCRIPT_NAME: upgrade os"
# Prevent interactive pseudo-gui shell from running during headless upgrade.
sudo DEBIAN_FRONTEND=noninteractive apt-get -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" upgrade

echo "$SCRIPT_NAME: install packages"

# Linux core
apt-get install -y dkms

# Source compilation
apt-get install -y build-essential
apt-get install -y automake
apt-get install -y pkg-config
apt-get install -y gcc
apt-get install -y g++
apt-get install -y libkrb5-dev

# Source control
apt-get install -y git-core

# Common utils
apt-get install -y curl
apt-get install -y expect
apt-get install -y less
apt-get install -y lsof
apt-get install -y vim
apt-get install -y wget

# Security
apt-get install -y libssl-dev
apt-get install -y ufw

echo "$SCRIPT_NAME: set up vagrant user's sudo privileges"
echo "vagrant ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

##### Set up environment variables.

cd "$APP_ROOT/script/component/bash/file"

echo "$SCRIPT_NAME: copy various config files to home directory"
cp "./command_prompt.bash"             "/home/$APP_USER/.command_prompt"
cp "./environment_vars.$NODE_ENV.bash" "/home/$APP_USER/.environment_vars"
cp "./profile.bash"                    "/home/$APP_USER/.profile"

##### Now we can run everything else

echo "$SCRIPT_NAME: run setup script as $APP_USER"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/component/install_all.sh"
