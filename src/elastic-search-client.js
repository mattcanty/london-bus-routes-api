var ElasticSearchClient = require('elasticsearchclient');

var serverOptions = {
    host: 'localhost',
    port: 9200
  };

var client = new ElasticSearchClient(serverOptions);

function bulkIndex (index, type, data, callback) {
  
  var commands = [];
  
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      commands.push({"index" : { "_index":index, "_type":type, "_id":key }});
      commands.push(data[key]);
    }
  }
  
  client.bulk(commands, {})
          .on('data', function(data) {})
          .on('done', function(done){callback()})
          .on('error', function(error){callback(error)})
          .exec();
}

function index (index, type, id, data, callback) {
}

function get (index, type, id, cb) {
  
  client.get(index, type, id, {})  
          .on('data', cb)
          .on('done', function(done){})
          .on('error', function(error){cb(error)})
          .exec();
}

function search (index, type, query) {
  
}

exports.bulkIndex = bulkIndex;
exports.index = index;
exports.get = get;
exports.search = search;
