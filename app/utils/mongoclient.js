let MongoClient = require('mongodb').MongoClient;
let uri = process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017';
let dbToUse = process.env.DB || 'cms';


function connect(url) {
    return MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(client => client.db())
}

module.exports = async function() {
    let databases = await Promise.all([connect(uri)]);
    return databases[0];
};