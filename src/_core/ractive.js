'use strict';

var backbone = require('./backbone');
var Ractive = require('ractive');
// Ractive.DEBUG = false;

var locationService = require('../services/location');

module.exports = Ractive.extend({
	adapt: [
		require('../adaptors/collection'),
		require('../adaptors/model'),
	],
	data: {
		__: function(key, subkey) {
			var value = this.get(key);

			if (typeof subkey !== 'undefined' && subkey !== null) {
				if (value instanceof backbone.Model) {
					return value.get(subkey);
				} else if (value instanceof backbone.Collection) {
					return value.at(subkey);
				} else {
					return value ? value[subkey] : undefined;
				}
			}

			return value;
		},
		__url: function() {
			return this.__url.apply(this, arguments);
		},
	},
	__url: function(path) {
		return locationService.buildInternalPath(path);
	},
});
