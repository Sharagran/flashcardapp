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

async function updateAccount(id, email, username, avatar) {
    return db.collection('accounts').updateOne({
        id: id
    }, {
        $set: {
            email: email,
            username: username,
            avatar: avatar
        }
    });
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

function addRubrik(name) {
    return db.collection('flashcards').insertOne({
        name: name,
        stapel: []
    });    
}

function addStapel(name, rubrik) {
    return db.collection('flashcards').updateOne(
        { name: rubrik },
        { $push: { stapel: {
            name: name,
            cards: []
        }}},
        { upsert: true }
    );
}

function addCard(id, begriff, erklärung, rubrik, stapel, keyword_array, kommentar_array, creatorId) {
    return db.collection('flashcards').updateOne(
        { "rubrik": rubrik, "stapel.name": stapel},
        { "$push": 
            {"stapel.$.flashcards": 
                {
                    "begriff": begriff,
                    "erklärung": erklärung,
                    "keyword_array": keyword_array,
                    "kommentar_array": kommentar_array,
                    "creatorId": creatorId
                }
            }
        },
        { "upsert": true }
    )
}

function addFlashcard(id, begriff, erklärung, rubrik, stapel, keyword_array, kommentar_array, creatorId) {
    // add stapel
    // db.collection('flashcards').updateOne(
    //     { rubrik: rubrik },
    //     { $addToSet: { stapel: stapel } });
    // add flashcard to stapel
    addRubrik(rubrik);
    addStapel(stapel, rubrik);
    return addCard(id, begriff, erklärung, rubrik, stapel, keyword_array, kommentar_array, creatorId);

    return db.collection('flashcards').insertOne({
        id: id,
        begriff: begriff,
        erklärung: erklärung,
        rubrik: rubrik,
        stapel: stapel,
        keyword_array: keyword_array,
        kommentar_array: kommentar_array,
        creatorId: creatorId
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
    addFlashcard,
    getFlashcards,
    getUniqueFlashcardFields
}
