'use strict';

const assert = require('chai').assert;

let update = require('../../../app/js/config/update');

describe('config->update', function() {

    it('should initiate with merge function', () => {
        assert.equal(typeof update.merge, 'function');
    });

    it('should merge base and target objects', () => {
        let base = {
                foo: 'bar'
            },
            target = {
                baz: 'blergh'
            };
        
        let output = update.merge(base, target);
        
        assert.typeOf(output, 'object');
        assert.lengthOf(Object.keys(output), 2);
        assert.equal(output.foo, 'bar');
        assert.equal(output.baz, 'blergh');
    });

    describe('bad inputs', () => {
       
        it('should return empty object on bad `base`', () => {
            let output = update.merge(null, { foo: 'bar' });

            assert.typeOf(output, 'object');
            assert.lengthOf(Object.keys(output), 0);
        });

        it('should return empty object on bad `target`', () => {
            let output = update.merge({ foo: 'bar' });

            assert.typeOf(output, 'object');
            assert.lengthOf(Object.keys(output), 0);
        });

        it('should return empty object on bad `base` and `target`', () => {
            let output = update.merge();

            assert.typeOf(output, 'object');
            assert.lengthOf(Object.keys(output), 0);
        });

    });

});