var http = require("http"),
    Promise = require("promise"),
    http_build_query = require('http-build-query');

var IrkfdbClient = {

    'API_URL': 'http://api.irkfdb.in/facts/',
    'VERSION_NUMBER': '1.0',
    'API_TYPE': 'NODE_CLIENT',

    'firstName': '',
    'lastName': '',

    'categories': false,
    'limitFactsCategories': [],
    'excludeFactsCategories': [],

    'isRandom': false,

    'setName': function (fName, lName) {
        if (fName.trim() !== '' && lName.trim() !== '') {
            firstName = fName;
            lastName = lName;
        } else {
            // TODO: Name are empty - throw appropriate exception
        }
    },

    'fromCategories': function (categories) {
        if (typeof categories === 'string') {
            limitFactsCategories = limitFactsCategories.concat(categories.split(","));
        }
        if (typeof categories === 'object') {
            limitFactsCategories = limitFactsCategories.concat(categories);
        }
    },

    'excludeCategories': function (categories) {
        if (typeof categories === 'string') {
            excludeFactsCategories = excludeFactsCategories.concat(categories.split(","));
        }
        if (typeof categories === 'object') {
            excludeFactsCategories = excludeFactsCategories.concat(categories);
        }
    },

    'getRandomFact': function () {
        isRandom = true;
        return makeApiCall();
    },

    'getCategories': function () {
        categories = true;
        return makeApiCall();
    },

    'makeUrl': function () {
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
    },

    'makeApiCall': function () {
        var promise = new Promise(function (resolve, reject) {
            get(makeUrl(), function (err, res) {
                if (err) reject(err);
                else resolve(res);
            });
        });
        return promise;
    }
};

module.exports = IrkfdbClient;