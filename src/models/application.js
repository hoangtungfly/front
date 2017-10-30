'use strict';

var _ = require('underscore');
var backbone = require('../_core/backbone');
var config = require('../data/config');
var apiCall = require('../services/api-call');

module.exports = backbone.Model.extend({
	urlRoot: config.apiEndPoint,
	url: function() {
		var url = this.urlRoot;

		return url;
	},
	apply: function() {
		var url = this.urlRoot ;
		var method = 'POST';
		var data;
		return new Promise(function(resolve, reject) {
			apiCall(method, url, data).then(function(responseData) {
				resolve(responseData);
			}.bind(this)).catch(function(error) {
				var responseJSON = error.responseJSON;
				if (typeof(responseJSON) === 'string') {
					error.responseJSON = JSON.parse(responseJSON);
				}
				reject(error);
			});
		}.bind(this));
	},
	cancel: function() {
		var url = this.urlRoot;

		return apiCall('DELETE', url);
	},
	initialize: function() {
		var Form = require('./application-form');

		this.__form = new Form({
			id: this.id,
		}).upgrade();
		this.__form._appId = this.id;
		this.__form.set('appId', this.id);

		this.on('change:id', function() {
			this.__form.id = this.id;
			this.__form._appId = this.id;
		});
	},
	createPlainRecord: function(attributes, options) {
		var Record = require('./record/plain-record');

		var record = new Record.Model(attributes, options);
		record.__app = this;
		record.__formItems = this.__form.get('items');

		return record;
	},
	createPlainRecords: function(models, options) {
		var Record = require('./record/plain-record');

		var records = new Record.Collection(models, options);
		records.__app = this;

		return records;
	},
	createRecord: function(attributes, options) {
		var Record = require('./record');

		var record = new Record(attributes, options);
		record.__app = this;

		return record.upgrade();
	},
	createRecords: function(models, options) {
		var RecordCollection = require('./record-collection');

		var records = new RecordCollection(models, options);
		records.__app = this;

		return records.upgrade();
	},
	createForm: function(attributes, options) {
		var Form = require('./application-form');

		var form = new Form(attributes, options);

		return form.upgrade();
	},
	cloneForm: function(form, options) {
		var clone = this.createForm(form.toJSON(options), options);
		clone.__cloneFrom = form.id;

		clone.id = require('node-uuid').v4();

		return clone;
	},
	ignoreFormItem: function(form, ignore) {
		var options = {
			notDeleteItemNo: true,
		};

		var clone = this.cloneForm(form, options);
		clone.get('items').reset();
		var formCheckClone = this.cloneForm(form, options);
		var autoField = [];

		formCheckClone.get('items').forEach(function(formItem) {
			if (!_.contains(ignore, formItem.get('type')) && !formItem.get('nonDisplay')) {
				clone.get('items').add(formItem);
			} else if (!_.contains(ignore, formItem.get('type')) && formItem.get('nonDisplay')) {
				autoField.push(formItem);
			}
		});

		clone.get('items').add(autoField, {
			at: clone.get('items').length,
		});

		return clone;
	},
	getStatuses: function() {
		var url = this.urlRoot + '/' + this.id + '/statuses';
		var method = 'GET';

		return new Promise(function(resolve, reject) {
			apiCall(method, url).then(function(responseData) {
				var response = responseData && JSON.parse(responseData);

				resolve(new backbone.Collection(response));
			}).catch(function(error) {
				reject(error);
			});
		});
	},
});
