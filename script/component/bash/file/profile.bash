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

# Exports - for environment.
if [ -f "$HOME/.environment_vars" ] ; then
  source "$HOME/.environment_vars"
fi

# Command-prompt customization.
if [ -f "$HOME/.command_prompt" ]; then
  source "$HOME/.command_prompt"
fi

# Exports - common.
export NGINX_ACCESS_LOG="/var/log/nginx/access.log"
export NGINX_ERROR_LOG="/var/log/nginx/error.log"

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

alias nginx_access_log="tail -f -n1000 $NGINX_ACCESS_LOG"
alias nginx_error_log="tail -f -n1000 $NGINX_ERROR_LOG"

# Aliases - bouncing
alias bounce_app="$APP_ROOT/script/component/app/bounce_app.sh"
alias bounce_bash="$APP_ROOT/script/component/bash/bounce_bash.sh"
alias bounce_mongo="$APP_ROOT/script/component/mongo/bounce_mongo.sh"
alias bounce_nginx="$APP_ROOT/script/component/nginx/bounce_nginx.sh"
alias bounce_node="$APP_ROOT/script/component/node/bounce_node.sh"

# Login.
cd "$APP_ROOT"
