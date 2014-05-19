var common = require("/nodedev/common");

function search(query, cb) {
  
  var upperQuery = query.toUpperCase();

  common.elasticsearchclient.get("bus", "route", upperQuery, function(data){
    var error = {};
    
    if (!data) {
      error.message = "There is a problem with elastic search!";
      error.code = 503;
      cb(error);
      return;
    }
    
    var jsonData = JSON.parse(data);
    
    if (jsonData.found === false) {
      error.message = "Bus route does not exist";
      error.code = 404;
      cb(error);
      return;
    }
            
    cb(undefined, jsonData._source);
  });
}

exports.search = search;
