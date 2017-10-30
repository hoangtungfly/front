'use strict';

var _ = require('underscore');
var Bluebird = require('../_core/bluebird');

function assign(ctx, key, value) {
	ctx[key] = value;
}

module.exports = function(def) {
	var asyncObject = {};

	return Bluebird.all(
		_.map(def, function(promise, key) {
			if (promise.then) {
				return promise.then(assign.bind(null, this, key));
			}

			return assign(this, key, promise);
		}, asyncObject)
	).then(function() {
		return asyncObject;
	});
};
