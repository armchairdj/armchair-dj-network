##### Bash.

bash -c "$APP_ROOT/script/component/setup/setup_bash.sh"
bash -c "$APP_ROOT/script/component/bounce/bounce_bash.sh"

##### Mongo.

bash -c "$APP_ROOT/script/component/setup/setup_mongo.sh"
bash -c "$APP_ROOT/script/component/bounce/bounce_mongo.sh"

##### Node.

bash -c "$APP_ROOT/script/component/setup/setup_node.sh"
bash -c "$APP_ROOT/script/component/bounce/bounce_node.sh"

##### Nginx.

bash -c "$APP_ROOT/script/component/setup/setup_nginx.sh"
bash -c "$APP_ROOT/script/component/bounce/bounce_nginx.sh"

##### App.

bash -c "$APP_ROOT/script/component/setup/setup_app.sh"
bash -c "$APP_ROOT/script/component/bounce/bounce_app.sh"
