var	http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
	  var pathname = url.parse(request.url).pathname.split("/", 2)[1];
	  console.log("Request for " + pathname + " received");
    
	  route(handle, pathname, response, request); 
  }
  var port = 12345;
  
  http.createServer(onRequest).listen(port);
  console.log("Server has started on port " + port);
}

exports.start = start;
