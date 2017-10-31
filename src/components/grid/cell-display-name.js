'use strict';

var component = require('../../services/component');

module.exports = component({
	ractive: {
		template: require('./cell-display-name.mustache'),
		observeOperators: function() {
			var recordId = this.get('recordId');
			var itemNo = this.get('itemNo');
			var username = '';

			operators = operators.where({
				recordId: recordId || null,
				itemNo: itemNo,
			});

			operators = operators.filter(function(model) {
				return typeof model.id !== 'undefined';
			});

			if (!operators || operators.length <= 0) {
				this.set('userName', null);
				return;
			}

			operators.forEach(function(operator) {
				username += operator.get('alias') + ', ';
			});

			username = username.substring(0, username.length - 2);
			this.set('userName', username);
		},
		oninit: function() {
			this.observeOperators.bind(this);
		},
	}
});
