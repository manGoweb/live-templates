var jf = require('jsonfile')
var path = require('path')
var assign = require('lodash.assign')

var Data = module.exports = function(folder, config) {
	this.dir = folder
	this.config = config

	this.data = {}

	// Check data values for resolutions
	if(config.data) {

		for(key in config.data){
			var value = config.data[key]

			// Try to read data from external JSON files
			var resolve = this.resolve(value)
			if(resolve !== null) value = resolve

			this.data[key] = value
		}
	}

	this.data.devmode = true;
	this.data.production =  false;
}

// Read data from external JSON files
Data.prototype.resolve = function(value) {
	var resolve = null

	if(typeof value == 'string' && ~value.indexOf('.json')){
		resolve = jf.readFileSync(path.resolve(this.dir, value), { throws: false })

		if(resolve === null) {
			c.error('Error in JSON data parsing for file ' + value)
		}
	}

	return resolve
}


// Get data specifis for current template
Data.prototype.get = function(template) {

	// In case of name == key, assign value as global object
	if(typeof this.data[template] !== 'undefined') {

		return assign(this.data, this.data[template])

	} else {

		return this.data

	}

}
