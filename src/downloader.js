var fs = require("fs");
var http = require("http");

function download(url, saveLocation, callback) {
  var data = "";
  var request = http.get(url, function (response) {
  
    console.log("Downloading: " + url);
  
    if ([301, 302].indexOf(response.statusCode) > -1 ) {
      
      console.log("Being redirected...");
    
      download(response.headers.location, saveLocation); 
      return;
    }
    
    response.on("data", function (chunk) {
      data += chunk;
    });
    
    response.on("end", function (chunk) {
      console.log("Download complete.");
      save(data, saveLocation, callback);
    });
  });
  
  request.on("error", function (e) {
    console.log("Error: " + e.message);
  });
}

function save(data, saveLocation, callback) {
  fs.writeFile(saveLocation, data, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
    callback();
  });
}

exports.download = download;
