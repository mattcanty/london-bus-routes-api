//var elasticsearchclient = require("./elastic-search-client");
var mongoclient = require('./mongodb-client');

function search(query, cb) {

  var upperQuery = query.toUpperCase();

  console.log('Looking for route ' + upperQuery);

  mongoclient.get("bus", "route", upperQuery, function(data, err){
    var error = {};

    if (err) {
      error.message = "There is a problem with mongodb!";
      error.code = 503;
      cb(error);
      return;
    }

    if (!data) {
      error.message = "Bus route does not exist";
      error.code = 404;
      cb(error);
      return;
    }

    cb(undefined, data);
  });
}

exports.search = search;
