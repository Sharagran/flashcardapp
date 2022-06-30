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

function addAccount(id, email, username, password) {
    return new Promise((resolve, reject) => {
        db.collection('accounts').insertOne({
            id: id,
            email: email,
            username: username,
            password: password,
            avatar: null
        }).then(resolve).catch(reject);
    });
}

function getAccount(query) {
    const matchQuery = matchAny(query);
    return new Promise((resolve, reject) => {
        db.collection('accounts').findOne(matchQuery).then(resolve).catch(reject);
    });
}

// TODO: überprüfen, ob email und username unique sind
function updateAccount(id, email, username, avatar) {
    return new Promise((resolve, reject) => {
        db.collection('accounts').updateOne({
            id: id
        }, {
            $set: {
                email: email,
                username: username,
                avatar: avatar
            }
        }).then(resolve).catch(reject);
    });
}

//#endregion


function addRubrik(name, ownerId) {
    return new Promise((resolve, reject) => {
        db.collection('rubrik').insertOne({
            name: name,
            ownerId: ownerId
        }).then(resolve).catch(reject);
    });
}

function addStapel(name, rubrikId) {
    return new Promise((resolve, reject) => {
        db.collection('stapel').insertOne({
            name: name,
            rubrikId: rubrikId
        }).then(resolve).catch(reject);
    });
}

function addFlashcard(begriff, erklärung, keyword_array, kommentar_array, stapelID) {
    return new Promise((resolve, reject) => {
        db.collection('flashcards').insertOne({
            begriff: begriff,
            erklärung: erklärung,
            keyword_array: keyword_array,
            kommentar_array: kommentar_array,
            stapelID: stapelID,
            lernstatus: 0
        }).then(resolve).catch(reject);
    });
}

function getFlashcards(query) {
    return db.collection('flashcards').find(query).toArray();
}

function getUniqueFlashcardFields(accountid, field) {
    return db.collection('flashcards').distinct(field, {
        creatorId: accountid
    });
}

module.exports = {
    connect,

    addAccount,
    getAccount,
    updateAccount,

    addRubrik,
    addStapel,
    addCard: addFlashcard,

    getFlashcards,
    getUniqueFlashcardFields
}
