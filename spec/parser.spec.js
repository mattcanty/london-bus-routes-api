'use strict';

var fs = require("fs");
var parser = require('../src/parser');

describe('parser', function(){
  it('parse all data from the downloaded file into an array', function(){

    function checkExpectations(data){
      expect(data.length).toBe(2);
    };

    var array = fs.readFileSync(__dirname + '/bus-sequences.csv').toString();

    parser.parseBusData(array, checkExpectations);
  });
});