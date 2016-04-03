#!/usr/bin/env bash

SCRIPT_NAME="** vagrant up"

echo "$SCRIPT_NAME: enable port forwarding"
echo "
rdr pass on lo0 inet proto tcp from any to any port 80 -> 127.0.0.1 port 9070
# rdr pass on lo0 inet proto tcp from any to any port 443 -> 127.0.0.1 port 5443
" | sudo pfctl -ef -

echo "$SCRIPT_NAME: done"
