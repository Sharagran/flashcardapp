const { MongoClient, ObjectId } = require('mongodb');

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

//#endregion

async function addRubrik(name, ownerId) {
    return db.collection('rubrik').insertOne({
        name: name,
        ownerId: ownerId
    });
}

async function addStapel(name, rubrikId) {
    return db.collection('stapel').insertOne({
        name: name,
        rubrikId: ObjectId(rubrikId)
    });
}

async function addFlashcard(begriff, erklärung, keyword_array, kommentar_array, stapelId) {
    return db.collection('flashcards').insertOne({
        begriff: begriff,
        erklärung: erklärung,
        keyword_array: keyword_array,
        kommentar_array: kommentar_array,
        stapelID: ObjectId(stapelId),
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

async function getAllRubriken(accountID) {
    return db.collection('rubrik').find({
        ownerId: ObjectId(accountID)
    }).toArray();
}

async function getAllStapel(rubrikId) {
    return db.collection('stapel').find({
        rubrikId: ObjectId(rubrikId)
    }).toArray();
}

// TODO: better naming
async function getAllFlashcards(stapelId) {
    return db.collection('flashcards').find({
        stapelID: ObjectId(stapelId)
    }).toArray();
}

async function getAllKeywords(accountID) {
    return new Promise((resolve, reject) => {
        db.collection('flashcards').aggregate([
            {
                '$lookup': {
                    'from': 'stapel',
                    'localField': 'stapelID',
                    'foreignField': '_id',
                    'as': 'Stapel'
                }
            }, {
                '$unwind': {
                    'path': '$Stapel'
                }
            }, {
                '$lookup': {
                    'from': 'rubrik',
                    'localField': 'Stapel.rubrikId',
                    'foreignField': '_id',
                    'as': 'Rubrik'
                }
            }, {
                '$unwind': {
                    'path': '$Rubrik'
                }
            },
            {
                '$match': {
                    'Rubrik.ownerId': accountID
                }
            }
        ]).toArray().then(result => {
            const keywords = new Set();
            result.forEach(flashcard => {
                flashcard.keyword_array.forEach(keyword => {
                    keywords.add(keyword);
                });
            });
            resolve(Array.from(keywords));
        }).catch(reject);
    });
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
    getUniqueFlashcardFields, //FIXME: uhnötig?

    getAllRubriken,
    getAllStapel,
    getAllKeywords
}
