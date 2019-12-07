var assert=require('chai').assert;
var first=require('../first');

describe('First', function(){
    it('First should return Hello World ', function(){
        assert.equal(first(),'Hello World')
    });
});