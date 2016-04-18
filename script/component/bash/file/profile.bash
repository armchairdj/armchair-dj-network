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

# Aliases.
alias log="tail -f -n10 $LOG_DIR/node.log"
alias 1000="tail -f -n1000 $LOG_DIR/node.log"
alias errors="grep 'Error' $LOG_DIR/node.log | vim -"

alias servers="ps aux | grep -v grep | grep node"

alias s="sudo start node"
alias sl="s && log"

alias r="sudo restart node"
alias rl="r && log"

alias tests="(cd /vagrant && make)"

alias db='mongo armchairdj'

alias nginx_access_log="sudo tail -f -n1000 $LOG_DIR/nginx_access.log"
alias nginx_error_log="sudo tail -f -n1000 $LOG_DIR/nginx_error.log"

# Aliases - bouncing
alias bounce_app="$APP_ROOT/script/component/app/bounce_app.sh"
alias bounce_bash="$APP_ROOT/script/component/bash/bounce_bash.sh"
alias bounce_mongo="$APP_ROOT/script/component/mongo/bounce_mongo.sh"
alias bounce_nginx="$APP_ROOT/script/component/nginx/bounce_nginx.sh"
alias bounce_node="$APP_ROOT/script/component/node/bounce_node.sh"

# Login.
cd "$APP_ROOT"
