var	http = require("http");
var url = require("url");

function start(route, handle) {

  console.log("Starting server");

  function onRequest(request, response) {

      console.log("Request received");

      var pathname = url.parse(request.url).pathname.split("/", 2)[1];
        console.log("Request for " + pathname + " received");
        route(handle, pathname, response, request);
    }

    var port = process.env.PORT || 8080;

    http.createServer(onRequest).listen(port);
    console.log("Server has started on port " + port);
}

exports.start = start;
