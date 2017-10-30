'use strict';

var Bluebird = module.exports = require('bluebird');

Bluebird.config({
	warnings: false,
	longStackTraces: false,
	cancellation: false,
});
