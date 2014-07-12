var downloader = require("./downloader");
var mongoclient = require("./mongodb-client");
var parser = require("./parser");
var config = require("./..config").tfl;

var busSeqsUrl = 'http://data.tfl.gov.uk/tfl/syndication/feeds/bus-sequences.csv?app_id=d081e14d&app_key=' + config.api_key;

function getData() {
  console.log("Downloading data");

  downloader.download(busSeqsUrl, parseData);
}

function parseData(data) {

  console.log("Parsing data");

  parser.parseBusData(data, indexData);
}

function indexData(data) {

  mongoclient.bulkIndex("bus", "route", data, function(err){
    if(err) {
      console.log(err);
    } else {
      console.log("Success");
    }
  });
}

getData();