var busdatafacade = require('./bus-data-facade');
var tflImporter = require('./tfl-import.js');
var querystring = require("querystring");
var util = require('util');
var url = require('url');

function route(response, request){
  var query = url.parse(request.url).pathname.split("/")[2];

  if(request.method === "GET" && query && query !== "") {

    console.log("bus routes api receieved GET /" + query);

    busdatafacade.search(query, function (error, result){

      if (error) {
        response.writeHead(error.code, {"Content-Type": "text/json"});
        response.write(JSON.stringify(error));
        response.end();
        return;
      }

      response.writeHead(200, {"Content-Type": "text/json"});
      response.write(JSON.stringify(result));
      response.end();
    });
  } else {
    var error = {error:{message:"Cannot deal with " + request.method + " /" + query}};

    response.writeHead(400, {"Content-Type": "text/json"});
    response.write(JSON.stringify(error));
    response.end();
  }
}

function importTflData(response, request){
  console.log('importing tfl data');
  
  tflImporter.importData();
  
  response.writeHead(200, {"Content-Type": "text/json"});
  response.write(JSON.stringify({message:'hello'}));
  response.end();
}

exports.route = route;
exports.importTflData = importTflData;
