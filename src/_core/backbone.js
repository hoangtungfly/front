'use strict';

var _ = require('underscore');
var backbone = require('backbone');

var Bluebird = require('./bluebird');

var apiCall = require('../services/api-call');

var originalSync = backbone.sync;

backbone.sync = function(action, model, options) {
	// disable cache on all AJAX request (related to IE11 extreme caching)
	options.cache = false;

	options.beforeSend = function(xhr) {
		var sid = require('global').TENANT + ':' + require('global').SID;

		if (sid) {
			xhr.setRequestHeader(config.authorizationHeader, sid);
		}
	};

	var xhr = originalSync.apply(this, arguments);

	return new Bluebird(function(resolve, reject) {
		xhr.then(resolve, reject);
	}).then(function() {
		return model;
	});
};

var originalToJSON = backbone.Model.prototype.toJSON;

backbone.Model.prototype.toJSON = function(options) {
	var object = originalToJSON.apply(this, arguments);

	_.forEach(object, function(value, key) {
		if (value instanceof backbone.Model || value instanceof backbone.Collection) {
			object[key] = value.toJSON(options);
		}
	});

	return object;
};

backbone.Model.prototype.apiCall = function(method, url, data) {
	return apiCall(method, url, data);
};

backbone.Collection.prototype.apiCall = function() {
	return backbone.Model.prototype.apiCall.apply(this, arguments);
};

module.exports = backbone;
