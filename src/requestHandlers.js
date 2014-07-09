var busdatafacade = require('./bus-data-facade');
var querystring = require("querystring");
var util = require('util');
var url = require('url');

function route(response, request){

  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);

  var method = request.method;

  console.log(request.url);

  var query = url.parse(request.url).pathname.split("/")[1];
  
  if(method === "GET" && query && query !== "") {
  
    console.log("bus routes api receieved GET /" + query);
  
    busdatafacade.search(query, function (error, result){
            
      if (error) {
      
        console.log(error);
        
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
    var error = {error:{message:"Cannot deal with " + method + " /" + query}};
  
    response.writeHead(400, {"Content-Type": "text/json"});
    response.write(JSON.stringify(error));
    response.end();
  }
}

exports.route = route;
