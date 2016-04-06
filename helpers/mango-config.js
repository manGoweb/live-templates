var path = require('path')

module.exports = function(folder) {

	var main = path.resolve(folder, './mango.json')
	var local = path.resolve(folder, './mango.local.json')

	var config = require(main)

	try {
		var configLocal = require(local)

		for(k in configLocal) {
			config[k] = configLocal[k]
		}
	} catch (e) {
		// no need to panic
	}


	return config

}