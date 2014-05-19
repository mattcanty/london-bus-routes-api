var common = require("/nodedev/common");
var parser = require("./parser");

var tflApiKey = "ff634865ae7e23fbd9488951e36a7455";
var tflBaseUrl = "http://data.tfl.gov.uk/tfl/syndication/feeds/";
var tempDir = "/nodedev/temp/";

var busStopsUrl = tflBaseUrl + "bus-stops.csv?app_id=d081e14d&app_key=" + tflApiKey;
var busSeqsUrl = tflBaseUrl + "bus-sequences.csv?app_id=d081e14d&app_key=" + tflApiKey;

var busStopsPath = tempDir + "bus-stops-data.csv"
var busSeqsPath = tempDir + "bus-seqs-data.csv"

//get data
function getData() {
  //common.downloader.download(busStopsUrl, busStopsPath);
  
  console.log("Downloading data");
  
  common.downloader.download(busSeqsUrl, busSeqsPath, parseData);
}

//parse csv data
function parseData() {

  console.log("Parsing data");
  
  parser.parseBusSequence(busSeqsPath, indexData);
}

//index data
function indexData(data) {
  
  common.elasticsearchclient.bulkIndex("bus", "route", data, function(err){
    if(err)
      console.log(err);
     else
      console.log("Success");
  });
  
}

//getData();
parseData();
//indexData({"1" : {_route: "bang", name: "John"}});