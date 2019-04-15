#!/usr/bin/env bash

SCRIPT_NAME="** bounce_bash"
FILE_PATH="$APP_ROOT/script/component/bash/file"
DESTINATION="/home/$APP_USER"

echo "$SCRIPT_NAME is STARTING"

echo "$SCRIPT_NAME: copy command prompt"
cp "$FILE_PATH/command_prompt.bash" "$DESTINATION/.command_prompt"

echo "$SCRIPT_NAME: copy environment variables"
cp "$FILE_PATH/environment_vars.$NODE_ENV.bash" "$DESTINATION/.environment_vars"

echo "$SCRIPT_NAME: copy profile"
cp "$FILE_PATH/profile.bash" "$DESTINATION/.profile"

echo "$SCRIPT_NAME: You should run 'source $DESTINATION/.profile' or restart your shell to pick up these changes"

echo "$SCRIPT_NAME: END"
