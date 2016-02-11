#!/usr/bin/env bash

echo "node: sudoers"

sudo cp /vagrant/scripts/setup/conf/sudoers.node /etc/sudoers.d/node && sudo chmod 0440 /etc/sudoers.d/node

echo "node: conf"

sudo cp /vagrant/scripts/setup/conf/node.conf /etc/init/node.conf
