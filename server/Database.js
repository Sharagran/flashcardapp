const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'myProject';


let db;

async function connect() {
    // Use connect method to connect to the server
    await client.connect(); //FIXME: dat geht nicht, kp wieso
    console.log('Connected successfully to server');
    db = client.db(dbName);
}

// Account: {
//     email: String,
//     password: String,
//     token: String
//     username: String
//     avatar: String (optional)
// }

async function addAccount(email, password) {
    //TODO: add id to account
    return db.collection('accounts').insertOne({
        email: email,
        password: password
    });
}

async function getAccount(email) {
    return db.collection('accounts').findOne({
        email: email
    });
}



module.exports = {
    connect,
    addAccount
}
