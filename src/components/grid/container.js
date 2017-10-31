'use strict;'

var component = require('../../services/component');

module.exports = component(
	ractive : {
		template : require('./container.mustache'),
		components : {
			GridRow : require('./row'),
		},
		data : function(){
			
		},
	},
);
