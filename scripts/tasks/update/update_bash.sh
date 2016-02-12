#!/usr/bin/env bash

SCRIPT_NAME="update_bash"

echo "$SCRIPT_NAME: copy command prompt"
cp "$CONF_FILE_DIR/command_prompt.bash" "$HOME/.command_prompt"

echo "$SCRIPT_NAME: copy environment variables"
cp "$CONF_FILE_DIR/environment_vars.$NODE_ENV.bash" "$HOME/.environment_vars"

echo "$SCRIPT_NAME: copy profile"
cp "$CONF_FILE_DIR/profile.bash" "$HOME/.profile"

echo "$SCRIPT_NAME: source updated files"
source "$HOME/.profile"
