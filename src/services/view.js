'use strict';

var Bluebird = require('../_core/bluebird');
var Ractive = require('../_core/ractive');

module.exports = function(setting) {
	return function(opt) {
		return Bluebird.resolve(setting.ractive).then(function(ractiveOpt) {
			// inject extra setting
			var view = new Ractive(ractiveOpt);

			setting.initialize(view, opt);

			if (opt && typeof opt.el === 'string') {
				opt.el = document.getElementById(opt.el);
			}

			if (opt && opt.el && view.render) {
				view.render(opt.el);
			}

			return view;
		});
	};
};
