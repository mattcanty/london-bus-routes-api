var config = {}

config.mongodb = {};
config.tfl = {};

config.mongodb.connection_string = '{{YOUR_MONGODB_HOST}}/busroutes';

config.tfl.api_key = '{{YOUR_TFL_API_KEY}}';
config.tfl.sequences_url = 'http://data.tfl.gov.uk/tfl/syndication/feeds/bus-sequences.csv?app_id=d081e14d&app_key=';

module.exports = config;