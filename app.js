/**
 * External dependencies.
 */

var ejs           = require('ejs');
var express       = require('express');
var fs            = require('fs');
var http          = require('http');
var json          = require('express-json');
var mongoose      = require('mongoose');
var morgan        = require('morgan')

// var auth       = require('connect-auth');
// var exec       = require('child_process').exec;
// var flash      = require('connect-flash');
// var mongo      = require('connect-mongo');

// var session    = require('express-session');

// require('express-mongoose');

/**
 * Bootstrap app.
 */

var app           = express();
// var MongoStore = mongo(express);

configure();

/**
 * Internal dependencies.
 */

var pjson         = require('./package.json');
var config        = require('./app/config/environment/development');
var environment   = require('./app/utils/environment');


/**
 * Configuration: Database & models.
 */

mongoose.connect(config.mongo.uri);

/**
 * Configuration: Plugins.
 */

app.use( json()                  );
// app.use( express.urlencoded()    );
// app.use( express.methodOverride());
// app.use( express.cookieParser()  );

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

app.set( 'view',       __dirname + '/app/view' );
app.set( 'view engine', 'jade'                   );
// app.set( 'assetRoot',   config.assets.root       );
// app.set( 'ver',         pjson.version            );
//
// app.use(flash());

/**
 * Configuration: Router & Server.
 */

var server = http.createServer(app);

require('./app/router/router')(app);

app.use(defaultRoute);

/**
 * Start server.
 */

if (process.getuid() === 0) {
  fs.stat(__filename, setProcessOwner);
}

if (app.get('env') !== 'test') {
  app.listen(8000);
}

/**
 * Functions: Environment config.
 */

function configure() {
  process.on('uncaughtException', handleUncaughtException);

  app.use(morgan('[:date] :status (:method :url) :response-time'));

  // if (environment.is('development')) {
  //   app.use(express.errorHandler(config.error.express));
  // }
}

/**
 * Functions: Logging & exceptions.
 */

function handleUncaughtException(err) {
  console.log('EXCEPTION - %s -> %s', new Date(), err);
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
