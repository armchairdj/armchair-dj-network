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
var mongo      = require('connect-mongo');

// var session    = require('express-session');

// require('express-mongoose');

/**
 * Bootstrap app.
 */

var app           = express();
// var MongoStore = mongo(express);

/**
 * Internal dependencies.
 */

var pjson         = require('./package.json');
var environment   = require('./app/util/environment');
var config        = require('./app/util/configure')();
var render        = require('./app/util/render');

console.log('config', config);

/**
 * Configuration: Database & models.
 */

mongoose.connect(config.mongo.uri);

require('./app/model/User');


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

app.set( 'views',       __dirname + '/app/view');
app.set( 'view engine', 'jade'                 );

app.locals.basedir = app.get('views');
//
// app.use(flash());

/**
 * Configuration: Router & Server.
 */

var server = http.createServer(app);

require('./app/router/router')(app);

app.use(defaultRoute);

app.use(morgan('[:date] :status (:method :url) :response-time'));

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
