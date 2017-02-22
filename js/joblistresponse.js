/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.ga4gh_task_exec.JobListResponse');

goog.require('jspb.Message');
goog.require('proto.ga4gh_task_exec.JobDesc');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ga4gh_task_exec.JobListResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ga4gh_task_exec.JobListResponse.repeatedFields_, null);
};
goog.inherits(proto.ga4gh_task_exec.JobListResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ga4gh_task_exec.JobListResponse.displayName = 'proto.ga4gh_task_exec.JobListResponse';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ga4gh_task_exec.JobListResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ga4gh_task_exec.JobListResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.ga4gh_task_exec.JobListResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ga4gh_task_exec.JobListResponse} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ga4gh_task_exec.JobListResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    jobsList: jspb.Message.toObjectList(msg.getJobsList(),
    proto.ga4gh_task_exec.JobDesc.toObject, includeInstance),
    nextpagetoken: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * repeated JobDesc jobs = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.ga4gh_task_exec.JobDesc>}
 */
proto.ga4gh_task_exec.JobListResponse.prototype.getJobsList = function() {
  return /** @type{!Array.<!proto.ga4gh_task_exec.JobDesc>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ga4gh_task_exec.JobDesc, 1));
};


/** @param {!Array.<!proto.ga4gh_task_exec.JobDesc>} value */
proto.ga4gh_task_exec.JobListResponse.prototype.setJobsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.ga4gh_task_exec.JobDesc=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ga4gh_task_exec.JobDesc}
 */
proto.ga4gh_task_exec.JobListResponse.prototype.addJobs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.ga4gh_task_exec.JobDesc, opt_index);
};


proto.ga4gh_task_exec.JobListResponse.prototype.clearJobsList = function() {
  this.setJobsList([]);
};


/**
 * optional string nextPageToken = 2;
 * @return {string}
 */
proto.ga4gh_task_exec.JobListResponse.prototype.getNextpagetoken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.ga4gh_task_exec.JobListResponse.prototype.setNextpagetoken = function(value) {
  jspb.Message.setField(this, 2, value);
};


