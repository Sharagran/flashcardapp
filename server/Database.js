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
    console.log('Connected successfully to Database');
    db = client.db(dbName);
}

// Überprüft, ob eines der query-ausdrucke zutrifft
// Wandelt AND query in OR query um
function matchAny(query) {
    const keys = Object.keys(query);
    const values = Object.values(query);
    const $or = keys.map((key, index) => {
        return {
            [key]: values[index]
        };
    });
    return {
        $or
    };
}

//#region Account

async function addAccount(id, email, username, password) {
    return db.collection('accounts').insertOne({
        id: id,
        email: email,
        username: username,
        password: password,
        avatar: null
    });
}

async function getAccount(query) {
    const matchQuery = matchAny(query);
    return db.collection('accounts').findOne(matchQuery);
}

// TODO: überprüfen, ob email und username unique sind
async function updateAccount(id, email, username, avatar) {
    db.collection('accounts').updateOne({
        id: id
    }, {
        $set: {
            email: email,
            username: username,
            avatar: avatar
        }
    });
}

//#endregion

async function addRubrik(name, ownerId) {
    db.collection('rubrik').insertOne({
        name: name,
        ownerId: ownerId
    });
}

async function addStapel(name, rubrikId) {
    return db.collection('stapel').insertOne({
        name: name,
        rubrikId: rubrikId
    });
}

async function addFlashcard(begriff, erklärung, keyword_array, kommentar_array, stapelID) {
    return db.collection('flashcards').insertOne({
        begriff: begriff,
        erklärung: erklärung,
        keyword_array: keyword_array,
        kommentar_array: kommentar_array,
        stapelID: stapelID,
        lernstatus: 0
    });
}

async function getFlashcards(query) {
    return db.collection('flashcards').find(query).toArray();
}

async function getUniqueFlashcardFields(accountid, field) {
    return db.collection('flashcards').distinct(field, {
        creatorId: accountid
    });
}

async function getAllRubriken() {
    return db.collection('rubrik').find({}).toArray();
}



module.exports = {
    connect,

    addAccount,
    getAccount,
    updateAccount,

    addRubrik,
    addStapel,
    addFlashcard,

    getFlashcards,
    getUniqueFlashcardFields,
    getAllRubriken
}
