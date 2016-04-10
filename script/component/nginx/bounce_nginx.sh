#!/usr/bin/env bash

SCRIPT_NAME="** bounce_nginx"
SITES=( "armchair-dj" "askauiguy" "bcchsclassof1991" "briandillard" "charlieandbrian" "nerdswithdaddyissues" "plastikfan")
FILE_PATH="$APP_ROOT/script/component/nginx/file"
AVAILABLE="/etc/nginx/sites-available"
ENABLED="/etc/nginx/sites-enabled"

echo "$SCRIPT_NAME: BEGIN"

for SITE in "${SITES[@]}"; do
  echo "$SCRIPT_NAME: copy $SITE to sites-available"
  echo "$FILE_PATH/$SITE.$NODE_ENV.site"
  echo "$AVAILABLE/$SITE"
  sudo cp "$FILE_PATH/$SITE.$NODE_ENV.site" "$AVAILABLE/$SITE"

  echo "$SCRIPT_NAME: link sites-available/$SITE to sites-enabled"
  sudo ln -s -f "$AVAILABLE/$SITE" "$ENABLED/$SITE"
done

echo "$SCRIPT_NAME: restart"
sudo service nginx stop
sudo service nginx start

echo "$SCRIPT_NAME: END"
