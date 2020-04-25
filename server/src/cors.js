const cors = require('cors')
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8080'];
const setupCors = (app ) => {
	const corsOptions = {
	  credentials: true, // This is important.
	  origin: (origin, callback) => {
	  	console.log('here')
	    if(whitelist.includes(origin)){	
	    	return callback(null, true)
	    }

	    callback(new Error('Not allowed by CORS'));
	  }
	}
	app.use(cors(corsOptions));
}

module.exports = setupCors