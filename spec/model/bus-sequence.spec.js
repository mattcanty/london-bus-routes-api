'use strict';

var BusStop = require('../../src/model/bus-stop');
var BusSequence = require('../../src/model/bus-sequence');

describe('bus-sequence', function(){
  it('Should create a new bus sequence with an empty "runs" object', function(){
    var myBusSequence = new BusSequence('1');
                           
    expect(myBusSequence._route).toBe('1');
    expect(myBusSequence._runs).toEqual({});
  });
  
  it('Should create a new run and add the new stop to it', function(){
    var myBusSequence = new BusSequence('1');
    
    var newBusStop = new BusStop();
    
    myBusSequence.addRun("1", newBusStop);
    
    expect(myBusSequence._runs["1"].length).toBe(1);
    expect(myBusSequence._runs["1"][0]).toEqual(newBusStop);
  });
});