/**
 * External dependencies.
 */

var express         = require('express');

var app             = express();

var auth            = require('connect-auth');
var flash           = require('connect-flash');
var mongo           = require('connect-mongo');
var session         = require('express-session');
var expressMongoose = require('express-mongoose');

var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser')
var ejs             = require('ejs');
var fs              = require('fs');
var http            = require('http');
var methodOverride  = require('method-override')
var mongoose        = require('mongoose');
var morgan          = require('morgan')

/**
 * Internal dependencies.
 */

var pjson           = require('../package.json');
var environment     = require('../lib/util/environment');
var config          = require('../lib/util/configure')();
var render          = require('../lib/util/render');

/**
 * Connect to Mongo & load models.
 */

require('../lib/model/User');

// var MongoStore      = mongo(express);
//
// mongoose.connect(config.mongo.uri);
//



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
 * Configuration: Authentication.
 *
 * WARN: session MUST go before auth strategy.
 */

// app.use(session({
//   cookie: config.cookie,
//   secret: config.session.secret,
//   store:  new MongoStore({
//     db:             config.session.db,
//     clear_interval: config.session.clear_interval,
//     url:            config.mongo.uri
//   })
// }));

// app.use(auth([ formStrategy() ]));

/**
 * Configuration: Views.
 */

app.engine('.html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.set( 'views',       __dirname + '/view');
app.set( 'view engine', 'jade'                 );

app.locals.basedir = app.get('views');

app.use(flash());

/**
 * Configuration: Router & Server.
 */

var server = http.createServer(app);

app.use(morgan('[:date] :status (:method :url) :response-time'));

require('../lib/router/router')(app);

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

function handleExpressError(err, req, res, next) {
  console.error(err.stack);

  res.status(500).send('Something broke!');

  // res.status(500);
  // render.page(req, res, '/error/500', {
  //   err: err
  // });
}

/**
 * Functions: Router.
 */

function defaultRoute(req, res, next) {
  if (req.xhr) {
    return res.status(404).json({ err: 'Not Found' });
  }

  // TODO BJD
  return res.status(404).json({ err: 'Not Found' });
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
