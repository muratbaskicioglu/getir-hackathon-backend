const MongoClient = require('mongodb').MongoClient;

module.exports = (connectionString) => {
	return MongoClient.connect(connectionString);
}