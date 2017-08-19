var chai = require('chai'),
    irkfdb = require("../src/index.js"),
    assert = chai.assert;

describe('testApiWorking', function () {
    it('checks api is working', function () {
        irkfdb.getRandomFact().then(function (data) {
            assert.equal(data.status, "FAIL");
            assert.isAbove(data.resultSet.length, 0, 'length should be strictly greater than 0');
        });
    });
});/*
describe('testProperCategoryFact', function () {
    it('checks category api is working', function () {
        irkfdb.fromCategories('geeky').getRandomFact().then(function (data) {
            assert.equal(data.status, "OK");
            assert.equal((data.resultSet.data[0].categories).indexOf('geeky'), true);
        });
    });
});
*/