'use strict';

var request = require('browser-request');

var Bluebird = require('../_core/bluebird');

module.exports = function(method, url, data) {
	return new Bluebird(function(resolve, reject) {
		// add timestamp into URL of request to disable cache
		var newUrl = url;
		
		var params = {
			method: method,
			url: newUrl,
			headers: {},
		};

		if (data) {
			params.json = {
				data: data,
			};
		}

		request(params, function(err, res, body) {
			// statusCode = 0 means request is aborted
			if (res.statusCode === 0) {
				return reject(err);
			}

			// check if response success but no body
			if (res.statusCode === 204) {
				return resolve();
			}

			if (err) {
				return reject(err);
			}

			// check if response code is not 2xx (SUCCESS)
			if (res.statusCode < 200 || res.statusCode > 299) {
				var error = {
					responseJSON: res.body,
				};
				return reject(error);
			}

			return resolve(body);
		});
	});
};
