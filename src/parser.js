var fs = require("fs");
var BusSequenceModel = require("./model/bus-sequence");
var BusStopModel = require("./model/bus-stop");
var GT_OSGB = require("./geotools2");

function parseBusData(data, callback){

  var busSeqData = {};
  var returnData = [];

  var lines = data.split('\r\n');

  var arrayLength = lines.length;

  console.log('Data contains ' + arrayLength + ' lines');

  for (var i = 1; i < arrayLength - 1; i++) {
    var d = lines[i].split(",");

    var route = d[0];
    var run = d[1];
    var sequence = d[2];
    var lbslStopCode = d[3];
    var busStopCode = d[4];
    var naptanAtco = d[5];
    var name = d[6];
    var easting = d[7];
    var northing = d[8];
    var heading = d[9];
    var virtual = d[10];

    var geoTool = new GT_OSGB();
    geoTool.setGridCoordinates(easting, northing);

    var coords = geoTool.getWGS84();

    var lat = coords.latitude;
    var lon = coords.longitude;

    var stop = new BusStopModel(lbslStopCode, busStopCode, naptanAtco, name,
                                lat, lon, heading, null, virtual);

    var index = returnData.indexOf();

    if (busSeqData[route]) {
      busSeqData[route].addStop(run, sequence, stop);
    } else {
      busSeqData[route] = new BusSequenceModel(route);

      busSeqData[route].addStop(run, sequence, stop);
    }
  }

  for(var key in busSeqData){
    returnData.push(busSeqData[key]);
  }

  callback(returnData);
}

function parseBusSequence(path, callback) {

  var array = fs.readFileSync(path).toString().split('\r\n');

    parseBusData(array, callback);
}

exports.parseBusSequence = parseBusSequence;
exports.parseBusData = parseBusData;
