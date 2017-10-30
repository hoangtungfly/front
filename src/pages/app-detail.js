'use strict';

var Bluebird = require('../_core/bluebird');

var dispose = require('../services/dispose');
// var appDetailControlFactory = require('../views/app-detail-control');
var gridViewFactory = require('../views/grid');

var users;

var queues = [
	app.__form.fetch({
		data: {
			applied: true,
		},
	})
];


Bluebird.all(queues).then(function() {
	return Bluebird.all([
		gridViewFactory({
			model: {
				users: users
			},
			el: 'app'
		}),
	]);
}).spread(function(recordView) {
	var fields = {};

	app.__form.get('items').forEach(function(item) {
		fields[item.get('itemNo')] = item.get('name');
	});

	recordView.set({
		fields: fields
	});

}).catch(function(err) {
	console.log(err);
	return false;
});
