#!/usr/bin/env bash

SCRIPT_NAME="** setup_app"

echo "$SCRIPT_NAME: BEGIN"

cd "$APP_ROOT"

echo "$SCRIPT_NAME: stop node"
sudo stop node

echo "$SCRIPT_NAME: set up pid directory"
mkdir -p "$PID_DIR"
sudo chown -R $APP_USER:$APP_USER "$PID_DIR"

echo "$SCRIPT_NAME: making sure $APP_USER owns npm directories"
sudo chown -R "$APP_USER:$APP_USER" "/home/$APP_USER/.npm"
sudo chown -R "$APP_USER:$APP_USER" $(npm config get prefix)/{lib/node_modules,bin,share}

if [ "$NODE_ENV" == "development" ]; then
  echo "$SCRIPT_NAME: clear node-gyp cache in development"
  sudo rm -rf "/home/$APP_USER/.node-gyp/"

  echo "$SCRIPT_NAME: remove node_modules in development to clear out previous vagrant environment"
  sudo rm -rf ./node_modules
  sudo rm -rf ./apps/broker-tool/node_modules
else
  echo "$SCRIPT_NAME: leaving node-gyp cache and node_modules alone in non-vagrant environment"
fi

echo "$SCRIPT_NAME: npm install: main app"
npm install

if [ "$NODE_ENV" == "development" ]; then
  echo "$SCRIPT_NAME: refresh database for $NODE_ENV"
  node "$APP_ROOT/script/db/populateDb.js"
else
  echo "$SCRIPT_NAME: leaving database alone because in non-vagrant environment"
fi

echo "$SCRIPT_NAME: start node"
sudo start node

echo "$SCRIPT_NAME: END"
