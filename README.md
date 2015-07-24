![Trace logo](https://cloud.githubusercontent.com/assets/1764512/8830445/83e8263c-309c-11e5-9f7f-aa3420e9b2f0.png)
***
[![Build Status](https://travis-ci.org/RisingStack/trace-nodejs.svg)](https://travis-ci.org/RisingStack/trace-nodejs)

**Trace is currently in beta and under active development - putting it into production is highly discouraged currently.**

## Installation and usage

```
npm install --save @risingstack/trace
```

After you installed Trace as a dependency, you just require it at the beginning of your main file.
```javascript
var trace = require('@risingstack/trace');
```

### Configuration

You have to specify a `reporter`, which implements a `send` method to send the traced requests to the Trace servers or to your Logstash or any other storage.

If you choose to use our service, you need to specify an api key.

In case you want to use your Logstash, you have to add the connection informations.

You can specify these informations two ways. Either using a config file, or via environment variables. Currently we look for the config file at the project root by default, which you can override with an absolute path in the `TRACE_CONFIG_PATH` environment variable. We try to read the config file and if there are `TRACE_APP_NAME` and/or `TRACE_REPORTER_TYPE` with `TRACE_REPORTER_CONFIG` env, we override the configuration accordingly.

An example for the `trace.config.js` config file using the Trace servers:

```javascript
/**
* The Trace configuration file
*/

var config = {};

config.appName = 'Users';

config.reporter = require('@risingstack/trace/lib/reporters').trace.create({
 apiKey: '1234',
 appName: config.appName
});

module.exports = config;
```

An example for Logstash config:
```javascript
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
```

An example for how to start your app without a config file:

```
node TRACE_APP_NAME=MyApp TRACE_REPORTER_TYPE=trace TRACE_REPORTER_CONFIG='{\"apiKey\":1,\"appName\":\"MyApp\"}' index.js
```

Note that if you want to use your custom reporter, you have to use the config file: the `TRACE_REPORTER_TYPE` environment variable is either `trace` or `logstash`. Also, the `TRACE_REPORTER_CONFIG` variable should be a valid, parseable JSON string.

## API

### trace.report(Object)

This method can be use to report additional data to the Trace servers which later on helps with debugging.

```javascript
trace.report({
  userId: 10
});
```

### trace.getTransactionId()

This method can be use to get the current transactionId. It can be useful if you want to integrate trace with your
current logging systems.

```javascript
var transactionId = trace.getTransactionId();
```


## Compatibility with Node versions

* v0.10@latest
* v0.12@latest
* iojs@latest

## Supported HTTP Client libraries

* native HTTP/HTTPS clients
* [request](https://github.com/request/request)
* [superagent](https://github.com/visionmedia/superagent)
* more coming soon!
