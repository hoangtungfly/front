'use strict';

var Bluebird = require('../_core/bluebird');
var Ractive = require('../_core/ractive');

module.exports = function(setting) {
	return Bluebird.all([
		setting.ractive,
		setting.base,
	]).spread(function(ractiveOpt, base) {
		// inject extra setting
		ractiveOpt.isolated = (setting.isolated !== false);

		return (base && base.prototype instanceof Ractive ?
				base : Ractive).extend(ractiveOpt);
	});
};
