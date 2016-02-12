##### Bash.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/setup/setup_bash.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/update/update_bash.sh"

##### Mongo.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/setup/setup_mongo.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/update/update_mongo.sh"

##### Node.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/setup/setup_node.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/update/update_node.sh"

##### Nginx.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/setup/setup_nginx.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/update/update_nginx.sh"

##### App.

sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/setup/setup_app.sh"
sudo -u "$APP_USER" -H bash -l -c "$APP_ROOT/script/task/update/update_app.sh"
