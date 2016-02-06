/**
 * External dependencies.
 */

var express    = require('express');

var auth       = require('connect-auth');
var ejs        = require('ejs');
var exec       = require('child_process').exec;
var flash      = require('connect-flash');
var fs         = require('fs');
var http       = require('http');
var mongo      = require('connect-mongo');
var mongoose   = require('mongoose');
var multer     = require('multer');

require('express-mongoose');

/**
 * Bootstrap app.
 */

var app        = express();
var MongoStore = mongo(express);

/**
 * Load globals.
 */

require('./lib/common/globals');

/**
 * Internal dependencies.
 */

var controllerUtils = require('./lib/utils/controllerUtils');
var flashMessages   = require('./lib/utils/flashMessages');
var formStrategy    = require('./lib/middleware/authStrategies/form');
var Question        = mongoose.model('Question');

/**
 * Configuration: By environment.
 */

app.configure( 'development', developmentConfig );
app.configure( 'staging',     stagingConfig     );
app.configure( 'production',  productionConfig  );

/**
 * Configuration: Database & models.
 */

app.set('db', config.mongo.uri);

mongoose.connect(config.mongo.uri);

Question.createDefaultQuestionSet();

/**
 * Configuration: Plugins.
 */

app.use( express.json()                 );
app.use( express.urlencoded()           );
app.use( express.methodOverride()       );
app.use( express.cookieParser()         );
app.use( multer({ dest: './uploads/' }) );

/**
 * Configuration: Authentication.
 *
 * WARN: express.session MUST go before auth strategy.
 */

app.use(express.session({
  cookie: config.cookie,
  secret: config.session.secret,
  store:  new MongoStore({
    db:             config.session.db,
    clear_interval: config.session.clear_interval,
    url:            config.mongo.uri
  })
}));

app.use(auth([ formStrategy() ]));

/**
 * Configuration: Views.
 */

app.engine('.html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.set( 'views',       __dirname + '/lib/views' );
app.set( 'view engine', 'jade'                   );
app.set( 'assetRoot',   config.assets.root       );
app.set( 'ver',         appVersion               );

app.use(flash());
app.use(flashMessages);

/**
 * Configuration: Locals.
 */

require('./lib/common/locals')(app);

/**
 * Configuration: Router & Server.
 */

app.use(app.router);

var server = http.createServer(app);

app.use(require('./apps/broker-tool'));

require('./lib/router/router')(app);

app.use(defaultRoute);

/**
 * Start server.
 */

if (process.getuid() === 0) {
  fs.stat(__filename, setProcessOwner);
}

/*
 * We listen on 8000 in all environments.
 * env is only 'test' when running specs. No point listening when running tests.
 */
if (app.get('env') !== 'test') {
  app.listen(8000);
}

/**
 * Functions: Environment config.
 */

function developmentConfig() {
  process.on('uncaughtException', handleUncaughtException);

  // TODO WFH We use basicLogger in staging, but loadBalancerLogger in dev?
  app.use(loadBalancerLogger);

  app.use(express.errorHandler(config.error.express));
}

function stagingConfig() {
  process.on('uncaughtException', handleUncaughtException);

  // TODO WFH This is redundant.  We have basic auth configured both in nginx
  // and here in express for staging.  So if a user bypassed nginx by directly
  // hitting the node app on :8000, we catch them with basic auth here.
  app.use(express.basicAuth(config.basicAuth.user, config.basicAuth.pass));

  // TODO WFH We use basicLogger in staging, but loadBalancerLogger in dev?
  app.use(basicLogger);
}

function productionConfig() {
  process.on('uncaughtException', handleUncaughtException);

  app.use(loadBalancerLogger);
}

/**
 * Functions: Logging & exceptions.
 */

function basicLogger(req, res, next) {
  express.logger(config.log.format)(req, res, next);
}

function loadBalancerLogger(req, res, next) {
  if (typeof req.headers['x-nodebalancer-status'] === 'string') {
    next();
  } else {
    basicLogger(req, res, next);
  }
}

function handleUncaughtException(err) {
  err = err || {};

  var stack = err.stack || err;

  console.log(config.error.format, new Date(), stack);
}

/**
 * Functions: Router.
 */

function defaultRoute(req, res, next) {
  if (req.xhr) {
    return res.json({ err: 'Not Found' }, 404);
  }

  controllerUtils.render404(req, res);
}

/**
 * Functions: Server.
 */

function setProcessOwner(err, stats) {
  if (err) {
    return logException(err);
  }

  process.setuid(stats.uid);
}

/**
 * Exports.
 */

module.exports = server;
