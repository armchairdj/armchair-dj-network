#!/bin/bash

# Verbose bash ouput.  See commands as they are run.
# set -x

# Leave commented for Linode.  Uncomment if debugging.
# [[ $UID -ne 0 ]] && echo "Must be run as root!" && exit 1

# Leave commented for Linode.  Uncomment if debugging.
# Abort script on ctrl+c.
# trap "echo Signal trap. Abort!; exit 1;" SIGINT SIGTERM

# The UDF format is used by Linode to accept parameters when running.
# These lines look commented, but WILL WORK CORRECTLY in the Linode web UI.
#<UDF name="new_hostname" label="Hostname" />
#<UDF name="node_env" label="NODE_ENV (staging or production)" />
#<UDF name="ssh_key" label="Paste in your public SSH key so you can login" />
#<UDF name="notify_email" label="Email address to notify when boostrap is complete" />
#<UDF name="github_username" label="Enter your github username (so we can add this machine's SSH key to github)" />
#<UDF name="github_password" label="Enter your github password (so we can add this machine's SSH key to github)" />

# Export any variables needed.
export IP=`ifconfig eth0 | grep "inet addr" | awk '{ print $2 }' | awk 'BEGIN { FS=":" } { print $2 }'`

# This redirects all commands following this line to the specified log file.
# I would love to use one big sub-shell and `tee`, but that does not seem to work
# well with Linode's bootstrapping system.
exec &> /root/stackscript.log

echo "Running armchairdj ubuntu bootstrap script."

# Log the date.
date

# Helper functions.
function lower {
  echo $1 | tr '[:upper:]' '[:lower:]'
}

function system_sshd_edit_bool {
  # $1 - param name
  # $2 - Yes/No
  VALUE=`lower $2`
  if [ "$VALUE" == "yes" ] || [ "$VALUE" == "no" ]; then
    sed -i "s/^#*\($1\).*/\1 $VALUE/" /etc/ssh/sshd_config
  fi
}

# Helpful bash configs.
sed -i -e 's/^#PS1=/PS1=/' /root/.bashrc
sed -i -e "s/^#alias ll='ls -l'/alias ll='ls -al'/" /root/.bashrc

# Set timezone.
ln -fs /usr/share/zoneinfo/America/Los_Angeles /etc/localtime

# Update apt repo.
apt-get update -y

# Install dependencies.
apt-get install build-essential automake git-core curl wget gcc g++ lib32z1-dev pkg-config libssl-dev ufw expect vim less lsof -y

# Setup hostname.

hostnamectl set-hostname "$NEW_HOSTNAME"
echo -e "\n127.0.0.1 $NEW_HOSTNAME.local $NEW_HOSTNAME\n" >> /etc/hosts

# Create some directories.
mkdir -p {src,scratch}

# Setup ufw firewall.
cat <<EOF > scratch/ufw_expect.sh
#!/usr/bin/expect

set timeout 60
spawn ufw enable
while {1} {
  expect {
    eof                        {break}
    "Proceed with operation"   {send "y\r"}
  }
}
wait
EOF

chmod +x scratch/ufw_expect.sh
scratch/ufw_expect.sh
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 8000
ufw default deny

# Postfix.
echo "postfix postfix/main_mailer_type select Internet Site" | debconf-set-selections
echo "postfix postfix/mailname string localhost" | debconf-set-selections
echo "postfix postfix/destinations string localhost.localdomain, localhost" | debconf-set-selections
apt-get install mailutils -y
aptitude -y install postfix
/usr/sbin/postconf -e "inet_interfaces = loopback-only"

# Turn off root sshd access.
system_sshd_edit_bool "PermitRootLogin" "no"
system_sshd_edit_bool "PasswordAuthentication" "no"
system_sshd_edit_bool "PubkeyAuthentication" "yes"

sudo systemctl restart sshd

# Install node.
cd src
wget http://nodejs.org/dist/v0.10.12/node-v0.10.12.tar.gz
tar xzvf node-v0.10.12.tar.gz
cd node-v0.10.12
./configure
make
sudo make install

sudo npm install -g npm@2.0.0

# Setup a deploy user.
useradd -U -s /bin/bash -m deploy

mkdir -p /home/deploy/{.ssh,src,scratch,app/current,app/shared/logs}
touch /home/deploy/app/shared/logs/node.log

echo "export NODE_ENV=$NODE_ENV" >> /home/deploy/.profile
chmod 0700 /home/deploy/.ssh
echo $SSH_KEY >> /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
echo "deploy ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Rectify permissions.
chown -R deploy:deploy /home/deploy/

echo "alias log='tail -f ~/app/shared/logs/node.log'" >> /home/deploy/.profile
echo "alias vlog='vim ~/app/shared/logs/node.log'" >> /home/deploy/.profile
echo "alias errors='grep "Error" ~/app/shared/logs/node.log | vim -'" >> /home/deploy/.profile
echo "alias servers='ps aux | grep -v grep | grep node'" >> /home/deploy/.profile

# Github known_hosts.
cat <<EOF > /home/deploy/.ssh/known_hosts
|1|w8rL5TpJWjFsLe/KELv1839MbwU=|UCFegywpxF4ziwmF/GPYhuII4j4= ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==
|1|vP9WJ+xqyudty0nl6qqM+23NF+Q=|JsLmCcxKptEgKuPjUPmje6VrN28= ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==
EOF

# Add new server key to github so we can pull app updates via SSH.
cat <<EOF > /home/deploy/scratch/ssh-keygen_expect.sh
#!/usr/bin/expect

set timeout 60
set name [lindex $argv 0]
spawn ssh-keygen -t rsa -C "$name" -f /home/deploy/.ssh/id_rsa
while {1} {
  expect {
    eof            {break}
    "passphrase"   {send "\r"}
  }
}
wait
EOF

chmod +x /home/deploy/scratch/ssh-keygen_expect.sh
/home/deploy/scratch/ssh-keygen_expect.sh DEPLOY@$NEW_HOSTNAME
export KEY=`cat /home/deploy/.ssh/id_rsa.pub`
export DATA=''"'"'{"title":"DEPLOY-'$NEW_HOSTNAME'", "key":"'$KEY'"}'"'"''
eval curl -X POST -u "$GITHUB_USERNAME:$GITHUB_PASSWORD" https://api.github.com/repos/armchairdj/armchairdj.com/keys -d "$DATA"
chown -R deploy:deploy /home/deploy/.ssh

# Checkout and install the app.
su - deploy -c "(cd ~/app/current && git clone git@github.com:armchairdj/armchairdj.com.git . && npm install)"

# sudoers.
cat <<EOF > /etc/sudoers.d/node
deploy     ALL=NOPASSWD: /usr/bin/systemctl enable node
deploy     ALL=NOPASSWD: /usr/bin/systemctl start node
deploy     ALL=NOPASSWD: /usr/bin/systemctl stop node
deploy     ALL=NOPASSWD: /usr/bin/systemctl restart node
EOF

chmod 0440 /etc/sudoers.d/node

# Upstart script.
cat <<'EOF' > /etc/init/node.conf
description "node server"

start on filesystem or runlevel [2345]
stop on runlevel [!2345]

respawn
respawn limit 10 5
umask 022

script
  HOME=/home/deploy
  . $HOME/.profile
  cd $HOME/app/current
  exec node $HOME/app/current/server.js >> $HOME/app/shared/logs/node.log 2>&1
end script

post-start script
  HOME=/home/deploy
  PID=`status node | awk '/post-start/ { print $4 }'`
  echo $PID > $HOME/app/shared/pids/node.pid
  echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Starting" >> $HOME/app/shared/logs/node.log
end script

post-stop script
  HOME=/home/deploy
  rm -f $HOME/app/shared/pids/node.pid
  echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Stopping" >> $HOME/app/shared/logs/node.log
end script
EOF

# Install nginx.
apt-get install nginx=1.4.6-1ubuntu3.3 -y

cat <<EOF > /etc/nginx/sites-available/node
upstream node {
  server 127.0.0.1:8000;
}

server {
  listen 0.0.0.0:80;
  server_name $IP;

  location / {
    client_max_body_size 10M;
    client_body_buffer_size 128k;

    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header Host \$http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://node/;
    proxy_redirect off;
  }

  location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|zip|tgz|gz|rar|bz2|pdf|txt|tar|wav|bmp|rtf|js|flv|swf|html|htm)$ {
    expires 30d;
    access_log off;
    root /home/deploy/app/current/public;
  }
}
EOF

ln -s /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node

# Notify user via email that the script is complete.
mail -s "Your Linode VPS is configured" "$NOTIFY_EMAIL" <<EOD
Hi,

You are all ready to roll on your new server.
Make sure to ssh in as the deploy user.

Yeehaw!
EOD

# Clear history.
history -c && rm -f ~/.bash_history

echo "Bootstrap script complete."

##### later!
exit 0
