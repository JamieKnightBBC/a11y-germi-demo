// features/support/world.js
var zombie = require('zombie');
function World() {
 this.browser = new zombie({waitDuration: 29*1000, runScripts: false }); // this.browser will be available in step definitions

 	//this.browser.debug();
 	this.visit = function (url, callback) {
   	this.browser.visit(url, callback);
  };
}

module.exports = function() {
  this.World = World;
};