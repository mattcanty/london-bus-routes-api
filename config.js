var argv = require('optimist').argv;

// Env. Variables for Heroku / Cmd Line Args for Cloud9 IDE
function getConfigSetting(key){

  var setting = process.env[key];

  return setting ? setting : argv[key];
}

var config = {};

config.tfl = {};
config.mongo = {};

config.tfl.api_key = getConfigSetting("TFL_API_KEY");
config.mongo.connectionString = getConfigSetting("MONGO_CONNECTION_STRING");

module.exports = config;