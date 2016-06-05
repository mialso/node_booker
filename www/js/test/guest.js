// force the test environment to 'test'
process.env.NODE_ENV = 'test';
// get the application server module
var app = require('../server.js');

describe('nodes page', function() {
	it('should show header');
	it('should show usage');
	it('should show nodes in a list');
});
