#!/usr/bin/env bash

SCRIPT_NAME="** bounce_bash"

echo "$SCRIPT_NAME is STARTING"

cd "$APP_ROOT/script/component/bash"

echo "$SCRIPT_NAME: copy command prompt"
cp "./command_prompt.bash" "/home/$APP_USER/.command_prompt"

echo "$SCRIPT_NAME: copy environment variables"
cp "./environment_vars.$NODE_ENV.bash" "/home/$APP_USER/.environment_vars"

echo "$SCRIPT_NAME: copy profile"
cp "./profile.bash" "/home/$APP_USER/.profile"

echo "$SCRIPT_NAME: You should run `source /home/$APP_USER/.profile` or restart your shell to pick up these changes"

echo "$SCRIPT_NAME: END"
