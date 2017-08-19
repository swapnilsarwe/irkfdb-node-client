var http = require("http"),
    Promise = require("promise"),
    http_build_query = require('http-build-query');

function IrkfdbClient() {

    const API_URL = 'http://api.irkfdb.in/facts/';
    const VERSION_NUMBER = '1.0';
    const API_TYPE = 'NODE_CLIENT';

    var firstName,
        lastName;

    var categories,
        limitFactsCategories = [],
        excludeFactsCategories = [];

    var isRandom;

    function setName(fName, lName) {
        if (fName.trim() !== '' && lName.trim() !== '') {
            firstName = fName;
            lastName = lName;
        } else {
            // TODO: Name are empty - throw appropriate exception
        }
    }

    function fromCategories(categories) {
        if (typeof categories === 'string') {
            limitFactsCategories = limitFactsCategories.concat(categories.split(","));
        }
        if (typeof categories === 'object') {
            limitFactsCategories = limitFactsCategories.concat(categories);
        }
    }

    function excludeCategories(categories) {
        if (typeof categories === 'string') {
            excludeFactsCategories = excludeFactsCategories.concat(categories.split(","));
        }
        if (typeof categories === 'object') {
            excludeFactsCategories = excludeFactsCategories.concat(categories);
        }
    }

    function getRandomFact() {
        isRandom = true;
        return makeApiCall();
    }

    function getCategories() {
        categories = true;
        return makeApiCall();
    }

    function makeUrl() {
        var apiCall = API_URL;

        if (categories == true) {
            return apiCall + 'categories';
        }

        if (isRandom == true) {
            apiCall += 'random';
        }

        var queryParams = {
            'api_type': API_TYPE,
            'version_number': VERSION_NUMBER
        };

        if (limitFactsCategories.length > 0) {
            queryParams['limitFactsTo'] = limitFactsCategories.join(",");
        }

        if (excludeFactsCategories.length > 0) {
            queryParams['excludeFactsFrom'] = excludeFactsCategories.join(",");
        }

        var strParams = '?' + http_build_query(queryParams);

        return apiCall + strParams;
    }

    function makeApiCall() {
        var promise = new Promise(function (resolve, reject) {
            get(makeUrl(), function (err, res) {
                if (err) reject(err);
                else resolve(res);
            });
        });
        return promise;
    }

    return {
        'getRandomFact': getRandomFact()
    }
}

module.exports = IrkfdbClient;