#!/usr/bin/env bash

echo "node: sudoers"

sudo cp /vagrant/scripts/setup/conf/sudoers.node /etc/sudoers.d/node && chmod 0440 /etc/sudoers.d/node

echo "node: conf"

sudo cp /vagrant/scripts/setup/conf/node.conf /etc/init/node.conf

# echo "node: restart"

# sudo restart node
