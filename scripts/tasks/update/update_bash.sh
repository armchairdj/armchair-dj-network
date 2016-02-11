#!/usr/bin/env bash

echo "bash: command prompt"
cp /vagrant/scripts/setup/conf/command_prompt.bash /home/vagrant/.command_prompt

echo "bash: profile & env variables"
cp /vagrant/scripts/setup/conf/profile.bash /home/vagrant/.profile

echo "bash: chown vagrant user home directory"
sudo chown -R vagrant:vagrant /home/vagrant
