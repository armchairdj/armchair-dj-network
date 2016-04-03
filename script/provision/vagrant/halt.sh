#!/usr/bin/env bash

SCRIPT_NAME="** vagrant halt"

echo "$SCRIPT_NAME: disable port forwarding"
sudo pfctl -df /etc/pf.conf

echo "$SCRIPT_NAME: done"
