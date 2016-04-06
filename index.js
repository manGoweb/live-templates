#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var express = require('express')
var jade = require('jade')

var getConfig = require('./helpers/mango-config')
var Data = require('./helpers/data')

// $ node index.js ROOT_DIR VIEWS_DIR
try {
	var rootDir = path.resolve(process.cwd(), process.argv[2])
	var viewsDir = path.resolve(process.cwd(), process.argv[3])

} catch(e){
	return console.log('Usage: live-templates [root_dir] [views_dir]')
}

// Setup env
var config = getConfig(process.cwd())
var templatesData = new Data(process.cwd(), config)

// Setup server
var app = express()
app.set('view engine', 'jade')
app.set('views', viewsDir)

// Serve all static files
app.use(express.static(rootDir))

// Serve live Jade templates
app.use(function(req, res, next) {
	// only try html files
	if(!~req.path.indexOf('.html')) return next()

	// try to find a jade template
	var filename = req.path.substring(1).replace('.html', '.jade')
	var filepath = path.resolve(viewsDir, filename)

	fs.access(filepath, fs.R_OK, err => {
		if(err) return next()

		var locals = templatesData.get(filename)

		res.render(filepath, locals)

	})

})



app.listen(3333, function () {
	console.log('Live templates listening on port 3333!')
})