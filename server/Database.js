const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'flashcardapp';


let db;

async function connect() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db(dbName);
}

// Account: {
//     id: String,
//     email: String,
//     username: String
//     password: String,
//     avatar: String (optional)
// }

async function addAccount(id, email, username, password) {
    return db.collection('accounts').insertOne({
        id: id,
        email: email,
        username: username,
        password: password,
        avatar: null
    });
}

async function getAccountById(id) {
    return db.collection('accounts').findOne({
        id: id
    });
}

async function getAccountByEmail(email) {
    return db.collection('accounts').findOne({
        email: email
    });
}



module.exports = {
    connect,
    addAccount,
    getAccountById,
    getAccountByEmail
}
