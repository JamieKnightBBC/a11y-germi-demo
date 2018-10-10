// Expose message codes to other modules.
module.exports.code = {
	"ENOH1": ["The Page is missing a H1", "Yellow"]
}

// Expode "page" rules
module.exports.page = {
	// Super simple rule
	hasH1: (page) => {
		if (page.hasH1 == 'true' || page.hasH1 == true) {
			return false
		} else {
			return 'ENOH1';	
		}
	}
}