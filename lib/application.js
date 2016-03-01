/**
 * External dependencies.
 */

var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser')
var ejs             = require('ejs');
var express         = require('express');
var expressMongoose = require('express-mongoose');
var expressSession  = require('express-session');
var flash           = require('connect-flash');
var fs              = require('fs');
var http            = require('http');
var methodOverride  = require('method-override')
var mongo           = require('connect-mongo');
var mongoose        = require('mongoose');
var morgan          = require('morgan')
var passport        = require('passport');

/**
 * Internal dependencies.
 */

var pjson           = require('../package.json');

var settings        = require('../lib/config/settings');

var authMiddleware  = require('../lib/middleware/authMiddleware');
var flashMiddleware = require('../lib/middleware/flashMiddleware');

var assetLocations  = require('../lib/util/assetLocations');
var environment     = require('../lib/util/environment');
var render          = require('../lib/util/render');

/**
 * Bootstrap app.
 */

var app             = express();

/**
 * Connect to Mongo & load models.
 */

mongoose.connect(settings.mongo.uri);

require('../lib/model/index');

var User = mongoose.model('User');

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
 * Authentication.
 */

var MongoStore = mongo(expressSession);

app.use(expressSession({
  cookie: {
    path:     '/',
    httpOnly: true,
    maxAge:   1000 * 60 * 60 * 24 * 365 * 1 /* 1 year */
  },
  name:               'armchairdj.sid',
  resave:             false,
  rolling:            true,
  saveUninitialized:  false,
  secret:             'throw them in the lake',
  store:              new MongoStore({
    collection:         'sessions',
    mongooseConnection: mongoose.connection,
    touchAfter:         24 * 3600 /* seconds */
  })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**
 * Configuration: Views.
 */

app.engine('.html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/view');
app.set('view engine', 'jade');

app.locals.basedir        = app.get('views');
app.locals.pretty         = true;

app.use(flash());
app.use(flashMiddleware);

/**
 * Cache asset locations in production.
 */

if (!environment.is('development')) {
  app.locals.assetLocations = assetLocations();
}

/**
 * Configuration: Server, Middleware, Router.
 */

var server = http.createServer(app);

app.use(morgan('[:date] :status (:method :url) :response-time'));

app.use(authMiddleware.findCurrentUser);

require('../lib/middleware/paramMiddleware')(app);

require('../lib/router/adminRouter'        )(app);
require('../lib/router/authRouter'         )(app);
require('../lib/router/playlistRouter'     )(app);
require('../lib/router/postRouter'         )(app);
require('../lib/router/releaseRouter'      )(app);
require('../lib/router/staticRouter'       )(app);
require('../lib/router/userRouter'         )(app);

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
