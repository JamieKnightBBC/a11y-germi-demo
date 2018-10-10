var assert = require('assert')
var rules = require('../../app/rules')


describe('Acessibility monitoring rules', function() {

    describe('rules.hasH1 - should flag on the bases of an H1 being present.', function() {
         it('should be a function ', function() {
             assert.equal(typeof(rules.page.hasH1), 'function');
        })


        it('should return ENOH1 if the page hasH1 property is not true', function() {
             assert.equal(rules.page.hasH1({hasH1: undefined}), 'ENOH1')
             assert.equal(rules.page.hasH1({hasH1: false}), 'ENOH1')
             assert.equal(rules.page.hasH1({hasH1: 'false'}), 'ENOH1')
        })
    })
 })