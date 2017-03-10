module.exports = {
	port: process.env.PORT || 8000,
	mongodb: {
		connectionString: process.env.MONGODB_CONNECTION_STRING || "mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon"
	}
};