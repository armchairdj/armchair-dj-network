#!/usr/bin/env bash

export NODE_ENV="production"
export APP_USER="deploy"
export APP_USER_HOME="/home/deploy"
export APP_ROOT="$APP_USER_HOME/app/current"
export NODE_LOG="$APP_USER_HOME/app/shared/logs/node.log"
export NODE_PID="$APP_USER_HOME/app/shared/pids/node.pid"
