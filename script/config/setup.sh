##### Bash.

bash -c "$APP_ROOT/script/config/setup/setup_bash.sh"
bash -c "$APP_ROOT/script/config/update/update_bash.sh"

##### Mongo.

bash -c "$APP_ROOT/script/config/setup/setup_mongo.sh"
bash -c "$APP_ROOT/script/config/update/update_mongo.sh"

##### Node.

bash -c "$APP_ROOT/script/config/setup/setup_node.sh"
bash -c "$APP_ROOT/script/config/update/update_node.sh"

##### Nginx.

bash -c "$APP_ROOT/script/config/setup/setup_nginx.sh"
bash -c "$APP_ROOT/script/config/update/update_nginx.sh"

##### App.

bash -c "$APP_ROOT/script/config/setup/setup_app.sh"
bash -c "$APP_ROOT/script/config/update/update_app.sh"
