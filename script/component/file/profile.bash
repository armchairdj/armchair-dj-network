# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# Source .bashrc if running bash.
if [ -n "$BASH_VERSION" ]; then
  # include .bashrc if it exists
  if [ -f "$HOME/.bashrc" ]; then
    . "$HOME/.bashrc"
  fi
fi

# Private bin.
if [ -d "$HOME/bin" ] ; then
  PATH="$HOME/bin:$PATH"
fi

# Command-prompt customization.
if [ -f "$HOME/.command_prompt" ]; then
  source "$HOME/.command_prompt"
fi

# Exports - for environment.
if [ -f "$HOME/.environment_vars" ] ; then
  source "$HOME/.environment_vars"
fi

# Exports - common.
export NGINX_ACCESS_LOG="/var/log/nginx/access.log"
export NGINX_ERROR_LOG="/var/log/nginx/error.log"
export CONF_FILE_DIR="$APP_ROOT/script/component/file"

# Aliases.
alias log="tail -f -n10 $NODE_LOG"
alias 1000="tail -f -n1000 $NODE_LOG"
alias errors='grep "Error" $NODE_LOG | vim -'

alias servers="ps aux | grep -v grep | grep node"

alias s="sudo start node"
alias sl="s && log"

alias r="sudo restart node"
alias rl="r && log"

alias tests="(cd /vagrant && make)"

alias db='mongo armchairdj'

alias nginx_bounce="sudo service nginx restart"
alias nginx_access="tail -f -n1000 $NGINX_ACCESS_LOG"
alias nginx_error="tail -f -n1000 $NGINX_ERROR_LOG"

# Login.
cd "$APP_ROOT"
