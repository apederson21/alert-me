'use strict';

const assert = require('chai').assert;

let config = require('../../../app/js/config/get');
let Q = require("q");

describe('config->get', function() {

    it('should initiate with proper key and type', () => {
        assert.equal(typeof config.loadConfig, 'function');
    });

    // TODO test cases for fetch

});