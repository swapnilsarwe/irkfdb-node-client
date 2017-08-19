var http = require("http"),
    Promise = require("promise"),
    http_build_query = require('http-build-query');

var IrkfdbClient = {

    'that': this,
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
            this.firstName = fName;
            this.lastName = lName;
        } else {
            // TODO: Name are empty - throw appropriate exception
        }
    },

    'fromCategories': function (categories) {
        if (typeof categories === 'string') {
            this.limitFactsCategories = (this.limitFactsCategories).concat(categories.split(","));
        }
        if (typeof categories === 'object') {
            this.limitFactsCategories = (this.limitFactsCategories).concat(categories);
        }
        return this;
    },

    'excludeCategories': function (categories) {
        if (typeof categories === 'string') {
            this.excludeFactsCategories = (this.excludeFactsCategories).concat(categories.split(","));
        }
        if (typeof categories === 'object') {
            this.excludeFactsCategories = (this.excludeFactsCategories).concat(categories);
        }
    },

    'getRandomFact': function () {
        this.isRandom = true;
        return this.makeApiCall();
    },

    'getCategories': function () {
        this.categories = true;
        return this.makeApiCall();
    },

    'makeUrl': function () {
        var apiCall = this.API_URL;

        if (this.categories == true) {
            return apiCall + 'categories';
        }

        if (this.isRandom == true) {
            apiCall += 'random';
        }

        var queryParams = {
            'api_type': this.API_TYPE,
            'version_number': this.VERSION_NUMBER
        };

        if ((this.limitFactsCategories).length > 0) {
            queryParams['limitFactsTo'] = (this.limitFactsCategories).join(",");
        }

        if ((this.excludeFactsCategories).length > 0) {
            queryParams['excludeFactsFrom'] = (this.excludeFactsCategories).join(",");
        }

        var strParams = '?' + http_build_query(queryParams);

        return apiCall + strParams;
    },

    'makeApiCall': function () {
        var promise = new Promise(function (resolve, reject) {
            try {
                http.get(IrkfdbClient.makeUrl(), function (res) {
                    var statusCode = res.statusCode;
                    if (statusCode !== 200) {
                        reject(new Error('Request Failed.\n' + 'Status Code: statusCode' + statusCode))
                    } else {
                        var body = "";
                        res.on('data', function (chunk) {
                            body += chunk;
                        });
                        res.on('end', function () {
                            try {
                                body = JSON.parse(body);
                                if (body.status === "OK") {
                                    resolve(body);
                                } else {
                                    reject(body.message);
                                }

                            } catch (e) {
                                reject(e);
                            }
                        })
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
        return promise;
    }
};

module.exports = IrkfdbClient;