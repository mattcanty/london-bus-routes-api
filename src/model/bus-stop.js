/*
Stop_Code_LBSL
Bus_Stop_Code
Naptan_Atco
Stop_Name
Location_Easting
Location_Northing
Heading
Stop_Area
Virtual_Bus_Stop
*/

var BusStop = function (lbslStopCode, busStopCode, naptanAtco, name, lat, 
                        lon, heading, area, virtual) {
    this._lbslStopCode = lbslStopCode;
    this._busStopCode = busStopCode;
    this._naptanAtco = naptanAtco;
    this._name = name;
    this._latitude = lat;
    this._longitude = lon;
    this._heading = heading;
    this._area = area;
    this._virtual = virtual;
};

module.exports = BusStop;
