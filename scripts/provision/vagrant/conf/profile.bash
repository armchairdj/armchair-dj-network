# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
  # include .bashrc if it exists
  if [ -f "$HOME/.bashrc" ]; then
    . "$HOME/.bashrc"
  fi
fi

# allow developers to customize their vagrant boxes with a gitignored script
if [ -f "/vagrant/scripts/provision/vagrant/conf/personal/.bashrc" ]; then
  source "/vagrant/scripts/provision/vagrant/conf/personal/.bashrc"
fi

[[ -f personal_bashrc ]] && source personal_bashrc

# fancy, color-coded, git-friendly command prompt
if [ -f "/home/vagrant/.fancy_pwd" ]; then
  source "/home/vagrant/.fancy_pwd"
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
  PATH="$HOME/bin:$PATH"
fi

alias 500='tail -n 500 ~/node.log'
alias log='tail -f ~/node.log'
alias s='sudo start node'
alias sl='s && log'
alias r='sudo restart node'
alias rl='r && log'
alias tests='(cd /vagrant && make)'

export NODE_ENV=development

cd /vagrant
