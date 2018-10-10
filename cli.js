#!/usr/bin/env node
let argv 		= require('minimist')(process.argv.slice(2))
let engine 	= require('./app/engine')

/* CLI niceness, gives us a command for cucumber and users to call. */
var options = {
	command: argv['_'][0],
	input: argv['_'][1],
	output: argv.output
}

if (options.command == "analyse") {
	engine.screen(options, (done, err) => {
		console.log("Screening Complete")
	})
}

// other commands here...