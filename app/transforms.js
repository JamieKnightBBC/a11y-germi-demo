const Transform = require('stream').Transform
var rules = require('./rules')

class screenPages extends Transform {
    constructor(options) {
        super({objectMode: true});
    }

    _transform(page, encoding, next) {
	   
	    // List the rules to be applies 
	    var ruleset = ['hasH1']
	
		// Apply each rule listed above 
		ruleset.forEach((rule) => {
			
			var result = rules.page[rule](page)
			
			if (result !== false){
				console.log('flagged')
				var flag = {flagMessage: rules.code[result][0], flagLevel: rules.code[result][1], productID: page.productID, URL: page.URL}
				
				this.push(flag)
			}
		})
	   
        next();
    }
}

// Make the tranforms visible to consumers and testing.
module.exports = {
	screen: {
		pages: screenPages
	}
}