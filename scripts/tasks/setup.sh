##### Bash.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/setup/setup_bash.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/update/update_bash.sh"

##### Mongo.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/setup/setup_mongo.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/update/update_mongo.sh"

##### Node.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/setup/setup_node.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/update/update_node.sh"

##### Nginx.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/setup/setup_nginx.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/update/update_nginx.sh"

##### App.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/setup/setup_app.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/scripts/tasks/update/update_app.sh"
