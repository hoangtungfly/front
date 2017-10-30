'use strict';
var _ = require('underscore');

var self = module.exports = {};

self.array = function(arr, disposeLogic) {
	_.forEach(arr, function(element, index) {
		if (!element) {
			return;
		}

		if (disposeLogic) {
			disposeLogic(element);
		}

		arr[index] = undefined;
	});
};

self.object = function(object, disposeLogic) {
	_.forEach(object, function(property, index) {
		if (!property) {
			return;
		}

		if (disposeLogic) {
			disposeLogic(property);
		}

		object[property] = undefined;
	});
};

self.event = function(events) {
	if (!events) {
		return;
	}

	_.forEach(events, function(event) {
		if (event && event.cancel && typeof event.cancel === 'function') {
			event.cancel();
		}
	});

	events.length = 0;
};
