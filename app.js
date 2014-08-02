var server = require("./src/server");
var router = require("./src/router");
var requestHandlers = require('./src/request-handlers');

console.log("Starting bus routes API");

var handle = {};
handle.route = requestHandlers.route;
handle.importtfldata = requestHandlers.importTflData;

server.start(router.route, handle);