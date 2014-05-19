'use strict';

var BusStop = require('../../src/model/bus-stop');

describe('bus-stop', function(){
  it('should be populated with all the values it is provided', function(){
    var myBusStop = new BusStop('lbslStopCode', 'busStopCode', 
                                'naptanAtco', 'name', 'lat', 'lon', 
                                'heading', 'area', 'virtual');
                           
    expect(myBusStop._lbslStopCode).toBe('lbslStopCode');
    expect(myBusStop._busStopCode).toBe('busStopCode');
    expect(myBusStop._naptanAtco).toBe('naptanAtco');
    expect(myBusStop._name).toBe('name');
    expect(myBusStop._latitude).toBe('lat');
    expect(myBusStop._longitude).toBe('lon');
    expect(myBusStop._heading).toBe('heading');
    expect(myBusStop._area).toBe('area');
    expect(myBusStop._virtual).toBe('virtual');
  });
  
});