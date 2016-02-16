/**
 * External dependencies.
 */

var auth            = require('connect-auth');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser')
var ejs             = require('ejs');
var express         = require('express');
var flash           = require('connect-flash');
var fs              = require('fs');
var http            = require('http');
var methodOverride  = require('method-override')
var mongo           = require('connect-mongo');
var mongoose        = require('mongoose');
var morgan          = require('morgan')
var session         = require('express-session');
var expressMongoose = require('express-mongoose');

/**
 * Internal dependencies.
 */

var pjson           = require('../package.json');
var environment     = require('../lib/util/environment');
var formStrategy    = require('../lib/middleware/formStrategy');
var config          = require('../lib/util/configure')();
var render          = require('../lib/util/render');

/**
 * Bootstrap app.
 */

var app             = express();

/**
 * Connect to Mongo & load models.
 */

mongoose.connect(config.mongo.uri);

require('../lib/model/User');
require('../lib/model/Post');

/**
 * Configuration: Middleware.
 */

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser())

app.use(methodOverride());

/**
 * Session.
 *
 * WARN: session MUST go before auth strategy.
 */

var MongoStore = mongo(session);

app.use(session({
  cookie: {
    path:     '/',
    httpOnly: true,
    maxAge:   1000 * 60 * 60 * 24 * 365 * 1 /* 1 year */
  },
  name:               'armchairdj.sid',
  resave:             false,
  rolling:            true,
  saveUninitialized:  true,
  secret:             'throw them in the lake',
  store:              new MongoStore({
    collection:         'sessions',
    mongooseConnection: mongoose.connection,
    touchAfter:         24 * 3600 /* seconds */
  })
}));

app.use(auth([ formStrategy() ]));

/**
 * Configuration: Views.
 */

app.engine('.html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.set( 'views',       __dirname + '/view');
app.set( 'view engine', 'jade'                 );

app.locals.basedir = app.get('views');
app.locals.pretty  = true;

app.use(flash());

/**
 * Configuration: Router & Server.
 */

var server = http.createServer(app);

app.use(morgan('[:date] :status (:method :url) :response-time'));

require('../lib/router/siteRouter')(app);
require('../lib/router/authRouter')(app);
require('../lib/router/adminRouter')(app);

app.use(defaultRoute);

app.use(handleExpressError);

/**
 * Start server.
 */

process.on('uncaughtException', handleUncaughtException);

if (process.getuid() === 0) {
  fs.stat(__filename, setProcessOwner);
}

if (app.get('env') !== 'test') {
  app.listen(8000);
}

/**
 * Functions: Logging & exceptions.
 */

function handleUncaughtException(err) {
  console.log('EXCEPTION - %s -> %s', new Date(), err);
}

/**
 * Functions: Exceptions.
 */

function handleExpressError(err, req, res, next) {
  render.serverError(req, res, err);
}

function defaultRoute(req, res, next) {
  render.notFound(req, res);
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
