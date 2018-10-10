let fs 			= require('fs')
let async 		= require('async')
var csv 		= require('csv');
var transforms  = require('./transforms')

module.exports.screen = (options, cb) => {
	async.waterfall([
		async.constant(options),
		flagPages
		// more things here...
	], (err, results) => {
		cb(null, err)
	})
}

/* This is an example of a stream performing a screen */
function flagPages(options, next){
	
	// Create an object stream from the csv file.
	var flagged = fs.createReadStream(options.input).pipe(csv.parse({columns: true})) 
		
	// Analyse the stream	
	var results = flagged.pipe(new transforms.screen.pages(options))
	
	// Convert to csv and write the result
	results.pipe(csv.stringify({header: true}))
		   //.pipe(process.stdout) //uncomment to debug to console.
           .pipe(fs.createWriteStream(options.output + '/flaggedPages.csv'))
           .on('close', next)
}