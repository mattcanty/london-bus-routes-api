var fs = require("fs");
var http = require("http");

function download(url, callback) {
  var data = "";
  var request = http.get(url, function (response) {

    console.log("Downloading: " + url);

    if ([301, 302].indexOf(response.statusCode) > -1 ) {

      console.log("Being redirected...");

      download(response.headers.location);
      return;
    }

    response.on("data", function (chunk) {
      data += chunk;
    });

    response.on("end", function () {
      console.log("Download complete.");

      callback(data);
    });
  });

  request.on("error", function (e) {
    console.log("Error: " + e.message);
  });
}

exports.download = download;
