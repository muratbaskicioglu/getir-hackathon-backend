const express = require('express'),
	  bodyParser = require('body-parser'),
	  config = require('./config'),
	  database = require('./db'),
	  app = express();

app.use(bodyParser.json({ type: () => true}));

database(config.mongodb.connectionString).then((db) => {
	const records = db.collection('records');
	return {
		getRecord: (key) => {
			return records.findOne({ key }, { key: 1, value: 1, createdAt: 1, _id: 0});
		}
	}
}).then((options) => {
	app.get('/getRecord', (req, res) => res.json({ error: true, reason: "GET method is not allowed! Use POST method." }));

	app.post('/getRecord', (req, res) => {
		const key = req.body;
		options.getRecord(key).then((results) => res.json(results || { error: true, reason: "Not found!" }))
							  .catch((err) => res.json({ error: true, reason: err.message }));
	});
	
	return app.listen(config.port);
}).catch((err) => {
    console.log("Application not works well. ", err);
});