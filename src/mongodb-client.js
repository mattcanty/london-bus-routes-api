var MongoClient = require('mongodb').MongoClient;
var connectionString = require('./../config').mongo.connectionString;

function get(index, type, data, callback){
	MongoClient.connect(connectionString, function(err, db) {
		if(err) { return console.dir(err); }

		var collection = db.collection('routes');

		console.log('Got "routes" collection');

		collection.findOne({'_route':data}, function(err, item) {
			if(err){
				console.log(err);
			}else{
				console.log(item);
				callback(item);
			}
		});
	});
}

function bulkIndex(index, type, data, callback){
	MongoClient.connect(connectionString, function(err, db) {
		if(err) { return console.dir(err); }

		var collection = db.collection('routes');

		collection.insert(data, {w:1}, function(err, result) {
			if(err){
				callback(err);
			}
		});
	});
}

exports.bulkIndex = bulkIndex;
exports.get = get;