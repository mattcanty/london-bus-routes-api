/*
Route
Run
Sequence
Stop_Code_LBSL
Bus_Stop_Code
Naptan_Atco
Stop_Name
Location_Easting
Location_Northing
Heading
Virtual_Bus_Stop
*/

var BusSequence = function (route) {
    this._route = route;
    this._runs = {};
};

BusSequence.prototype.addRun = function(runId, busStop) {
  var seqArray = [];
  seqArray.push(busStop);  

  this._runs[runId] = seqArray;
};

BusSequence.prototype.addStop = function(runId, sequenceId, busStop) {
  busStop._sequenceId = sequenceId;

  if (this._runs[runId]) {
    this._runs[runId].push(busStop);
  } else {
    this.addRun(runId, busStop);
  }
};

module.exports = BusSequence;
