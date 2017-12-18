# irkfdb.in node client [![Build Status](https://travis-ci.org/irkfdb/irkfdb-node-client.svg?branch=master)](https://travis-ci.org/irkfdb/irkfdb-node-client)
NodeJS API Client for the Internet Rajinikanth Facts Database. Its a wrapper class for the free database of Rajinikanth Facts hosted by irkfdb.in

## Install
Using npm

```
npm install irkfdb-node-client
```

## Usage
To get the categories
```javascript
var irkfdb = require('irkfdb-node-client')

irkfdb.getCategories().then(function (data) {
   console.log(data);
});
```

Sample Response
```json
{
  "status": "OK",
  "resultSet":
   { "data":
      [ "nsfw",
        "geeky"
      ]
   }
}
```

In case of API failure, the response would be as follows
Sample Response
```json
{
  "status": "FAIL",
  "errMessage": "<err message>"
}
```

To get the random fact
```javascript
var irkfdb = require('irkfdb-node-client')

irkfdb.getRandomFact().then(function (data) {
   console.log(data);
});
```

Sample Response
```json
{
    "status": "OK",
    "resultSet": {
        "data": [{
            "hash_id": "42e9f7c05e6b04bd9bc137ef10e0d86e",
            "db_id": 522,
            "fact": "Rajinikanth can over-write a locked variable.",
            "categories": ["geeky"],
            "sources": ["api.icndb.com"]
        }],
        "total_facts": 100
    }
}
```

To get the random fact from the selected category/categories
```javascript
var irkfdb = require('irkfdb-node-client')

// random fact belonging to one category
irkfdb.fromCategories('geeky').getRandomFact().then(function (data) {
    console.log(data);
});

//or for multiple categories
irkfdb.fromCategories('nsfw,geeky').getRandomFact().then(function (data) {
    console.log(data);
});
// OR
irkfdb.fromCategories(['nsfw','geeky']).getRandomFact().then(function (data) {
    console.log(data);
});

```

To exclude the fact from the particular category/categories
```javascript
var irkfdb = require('irkfdb-node-client')

// random fact not belonging to one category
irkfdb.excludeCategories('geeky').getRandomFact().then(function (data) {
    console.log(data);
});

//or for multiple categories
irkfdb.excludeCategories('nsfw,geeky').getRandomFact().then(function (data) {
    console.log(data);
});
// OR
irkfdb.excludeCategories(['nsfw','geeky']).getRandomFact().then(function (data) {
    console.log(data);
});
```
