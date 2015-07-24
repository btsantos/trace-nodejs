/**
 * The Trace configuration file
 */

var config = {};

config.appName = 'Users';

config.reporter = require('@risingstack/trace/lib/reporters').logstash.create({
  type: 'tcp',
  host: 'localhost',
  port: 12201
});

module.exports = config;
