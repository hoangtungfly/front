'use strict;'

var _= require('underscore');


module.exports= components({
	ractive : {
		template : require('./row.mustache'),
		components : [
			GridCell : require('./cell'),
			GridCellDisplayName: require('./cell-display-name'),
		],
		data : {
		},
	}
});