##### Bash.

bash -c "$APP_ROOT/script/component/setup/bounce_bash.sh"
bash -c "$APP_ROOT/script/component/update/update_bash.sh"

##### Mongo.

bash -c "$APP_ROOT/script/component/setup/bounce_mongo.sh"
bash -c "$APP_ROOT/script/component/update/update_mongo.sh"

##### Node.

bash -c "$APP_ROOT/script/component/setup/bounce_node.sh"
bash -c "$APP_ROOT/script/component/update/update_node.sh"

##### Nginx.

bash -c "$APP_ROOT/script/component/setup/bounce_nginx.sh"
bash -c "$APP_ROOT/script/component/update/update_nginx.sh"

##### App.

bash -c "$APP_ROOT/script/component/setup/bounce_app.sh"
bash -c "$APP_ROOT/script/component/update/update_app.sh"
