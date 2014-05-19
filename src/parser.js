var fs = require("fs");
var BusSequenceModel = require("./model/bus-sequence");
var BusStopModel = require("./model/bus-stop");
var GT_OSGB = require("./geotools2");

function parseBusSequence(path, callback) {

  var array = fs.readFileSync(path).toString().split('\r\n');
  
  var busSeqData = {};
  
  var arrayLength = array.length;
  
  //We're not interested in the first or last line  
  for (var i = 1; i < arrayLength - 1; i++) {
      
    var d = array[i].split(",");
    
    
    
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
    
    if (busSeqData[route]) {
      busSeqData[route].addStop(run, sequence, stop);
    } else {
      busSeqData[route] = new BusSequenceModel(route);
      
      busSeqData[route].addStop(run, sequence, stop);
    }
  }
  
  callback(busSeqData);
}

exports.parseBusSequence = parseBusSequence;