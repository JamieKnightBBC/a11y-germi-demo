var {defineSupportCode} = require('cucumber');
var fs 		   			= require('fs')
var parse 				= require('csv-parse/lib/sync');
var stringify  			= require('csv-stringify/lib/sync');
var childProcess 		= require('child_process')

// Default test record
var testPage = {productID: 'testProduct', URL: '/testPage'}

// Somewhere to store results after running analysis
var results = []

/* 
	Given commands set up the TestPage 
*/
defineSupportCode(function({Before, Given, Then, When}) {
	Given('a Page', function (callback) {
		// nothing to do.
	    callback(null);
	})
	
	Given('a {string} is {string}', function (property, value) {
       testPage[property] = value;
    })
})
 
 
/* 
    When command write the test file, run germi and reads the results.
*/
defineSupportCode(function({Before, Given, Then, When}) {
	When('analysis is run', function (callback) {
	    // create test directory
	    var directory = "/tmp/germi-test" + new Date().getTime()
	    fs.mkdirSync(directory)
	    
	    // Create a test file.
	    fs.writeFileSync(directory + '/test.csv', stringify([testPage], {header: true, columns: Object.keys(testPage)}));
	    
	    var command  = 'germi analyse ' + directory + '/test.csv --output ' + directory;
	
		// Execute the command, parse the output file.
		childProcess.exec(command, function (error, stdout, stderr) {
			
			results['flaggedPages'] = parse(fs.readFileSync(directory + '/flaggedPages.csv'), {columns: true});
	
			callback(null)
	    })
	})

})
	
/* 
    Then steps check the results are as expected...
*/
defineSupportCode(function({Before, Given, Then, When}) {
	Then('the page {string} be flagged', function (condition, callback) {
      
		// did it get flagged?  
		var flagged = (results['flaggedPages'][0] && testPage.URL == results['flaggedPages'][0].URL)
		
		if (condition == "should"){
			if (flagged == true) {
				callback(null)
			} else {
				callback('Page has not been flagged when it should have been')
			}
		} else if (condition == "should not"){
			if (flagged == true) {
				callback('Page has  been flagged when it should not have been')
			} else {
				callback(null)
			}	
			
		} else {
			callback(null, 'pending');	
		}
     })
})