var chai = require('chai'),
    irkfdb = require("../src/index.js"),
    assert = chai.assert,
    expect = chai.expect;

describe('testApiWorking', function () {
    it('checks api is working', function (done) {
        irkfdb.getRandomFact().then(function (data) {
            assert.equal(data.status, "OK");
            assert.isAbove((data.resultSet.data).length, 0, 'length should be strictly greater than 0');
            done();
        });
    });
});
describe('testProperCategoryFact', function () {
    it('checks category api is working', function (done) {
        irkfdb.fromCategories('geeky').getRandomFact().then(function (data) {
            assert.equal(data.status, "OK");
            assert.equal(((data.resultSet.data[0].categories).indexOf('geeky') > -1), true);
            done();
        });
    });
});
