var server = require("./src/server");
var router = require("./src/router");
var requestHandlers = require('./src/requestHandlers');

console.log("Starting bus routes API");

var handle = {};
handle.route = requestHandlers.route;

server.start(router.route, handle);