var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["route"] = requestHandlers.route;

server.start(router.route, handle);
