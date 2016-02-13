/**
 * External dependencies.
 */

var cluster     = require('cluster');

/**
 * Internal dependencies.
 */

var environment = require('../lib/util/environment');

/**
 * Run server.
 */

var debug       = process.execArgv.indexOf('--debug-brk') !== -1;

if (debug) {
  return workerThread();
}

if (environment.is('development')) {
  require('locus');
}

if (cluster.isMaster) {
  masterThread();
} else {
  workerThread();
}

/**
 * Functions.
 */

function forkWorker(deadWorker, code, signal) {
  /* Restart the worker */
  var worker = cluster.fork();

  var newPID = worker.process.pid;
  var oldPID = deadWorker.process.pid;

  console.log('Worker ' + oldPID + ' died.');
  console.log('Worker ' + newPID + ' born.');
}

function masterThread() {
  var numCPUs = require('os').cpus().length;

  /* Fork workers. One per CPU for maximum effectiveness */
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', forkWorker);
}

function workerThread() {
  require('../app/application');
}
