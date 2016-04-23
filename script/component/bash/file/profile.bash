# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# Functions.

nginxAccessLog() {
  # $1 = site identifier, for instance 'briandillard'
  sudo tail -f -n1000 "$LOG_DIR/$1_access.log"
}

nginxErrorLog() {
  # $1 = site identifier, for instance 'briandillard'
  sudo tail -f -n1000 "$LOG_DIR/$1_error.log"
}

# Source .bashrc if running bash.

if [ -n "$BASH_VERSION" ]; then
  if [ -f "$HOME/.bashrc" ]; then
    . "$HOME/.bashrc"
  fi
fi

# Private bin.

if [ -d "$HOME/bin" ] ; then
  PATH="$HOME/bin:$PATH"
fi

# Environment variables from source control.

if [ -f "$HOME/.environment_vars" ] ; then
  source "$HOME/.environment_vars"
fi

# Command prompt customization.

if [ -f "$HOME/.command_prompt" ]; then
  source "$HOME/.command_prompt"
fi

# Aliases: Mongo.

alias db='mongo armchairdj'
alias log_db='tail -f -n100 /var/log/mongodb'

# Aliases: Nginx logging.

alias nginx_access_log=nginxAccessLog
alias nginx_error_log=nginxErrorLog

# Aliases: Node logging.

alias log="tail -f -n10 $LOG_DIR/node.log"
alias 1000="tail -f -n1000 $LOG_DIR/node.log"
alias errors="grep 'Error' $LOG_DIR/node.log | vim -"

# Aliases: Node servers.

alias servers="ps aux | grep -v grep | grep node"

alias s="sudo start node"
alias sl="s && log"

alias r="sudo restart node"
alias rl="r && log"

# Aliases: Specs.

alias tests="(cd $APP_ROOT && make)"

# Aliases: Update components.

alias bounce_app="$APP_ROOT/script/component/app/bounce_app.sh"
alias bounce_bash="$APP_ROOT/script/component/bash/bounce_bash.sh"
alias bounce_mongo="$APP_ROOT/script/component/mongo/bounce_mongo.sh"
alias bounce_nginx="$APP_ROOT/script/component/nginx/bounce_nginx.sh"
alias bounce_node="$APP_ROOT/script/component/node/bounce_node.sh"

# Login.

cd "$APP_ROOT"
