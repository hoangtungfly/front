
var _ = require('underscore');
var Bluebird = require('../_core/bluebird');
var EventEmitter = require('events');
var view = require('../services/view');

module.exports = view({
	ractive: ({
		template: require('./grid.mustache'),
		decorators: {
			updateRecordStatisticPosition: function(node) {
				node.parentNode.parentNode.insertBefore(node, node.parentNode);
				return {
					teardown: function(node) {
						// teardown
					},
				};
			},
		},
		components: asyncObject({
			GridContainer: require('../components/grid/container'),
		}),
		data: function() {
			var dispatcher = new EventEmitter();
			dispatcher.setMaxListeners(0);

			return {
				records: [],
				recordCount: 0,
				dispatcher: dispatcher,
			};
		},
		oninit: function() {
		},
	}),

	initialize: function(view, opt) {
		var form = opt.model.app.__form;
		var columns = extractColumns(form.get('items'), opt.model.filter);
		var records = view.get('records');

		records.reset(opt.model.records.records, {
			silent: true,
		});

		records.on('change', function() {
			// records.push(plainRecord, {
			// 	silent: true,
			// });

			view.update('records');
		});

		view.set({
			columns: columns,
			users: opt.model.users,
			recordCount: opt.model.records.recordCount,
		});

		view.update('records');
	},
});