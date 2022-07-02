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
    console.log(stapelId);
    return db.collection('flashcards').insertOne({
        begriff: begriff,
        erklärung: erklärung,
        keyword_array: keyword_array,
        kommentar_array: kommentar_array,
        stapelID: ObjectId(stapelId),
        lernstatus: 0
    });
}

async function deleteFlashcard(id) {
    return db.collection('flashcards').deleteOne({
        _id: ObjectId(id)
    });
}

async function getFlashcard(id) {
    return db.collection('flashcards').findOne({
        _id: ObjectId(id)
    });
}

async function getFlashcards(query) {
    return db.collection('flashcards').find(query).toArray();
}

async function getStapelFlashcards(stapelId) {
    return db.collection('flashcards').find({
        stapelID: ObjectId(stapelId)
    }).toArray();
}

async function getAccountFlashcards() {
    //TODO:
    throw new Error('Not implemented');
    // aggregation required
    return db.collection('flashcards').find({
        ownerId: ObjectId(accountId)
    }).toArray();
}

async function getAllRubriken(accountID) {
    return db.collection('rubrik').find({
        ownerId: accountID
    }).toArray();
}

async function getAllStapel(rubrikId) {
    return db.collection('stapel').find({
        rubrikId: ObjectId(rubrikId)
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

async function updateLernstatus(flashcardId, lernstatus) {
    return db.collection('flashcards').updateOne({
        _id: ObjectId(flashcardId)
    }, {
        $set: {
            lernstatus: lernstatus
        }
    });
}

async function getStats(accountID) {
    // count lernstatus
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
            }, {
                '$match': {
                    'Rubrik.ownerId': accountID
                }
            }, {
                '$group': {
                    '_id': '$lernstatus',
                    'count': {
                        '$sum': 1
                    }
                }
            }
        ]).toArray().then(result => {
            // 0 = noch zu lernen, 1 = hab's drauf, -1 = kann's nicht
            const stats = {
                "noch zu lernen": result.find(x => x._id === 0)?.count ||0,
                "hab's drauf": result.find(x => x._id === 1)?.count || 0,
                "kann's nicht": result.find(x => x._id === -1)?.count || 0
            };
            resolve(stats);
        }).catch(reject);
    });
}

async function shareFlashcard(id, email, expires, deleteAfter) {
    return db.collection('shared').insertOne({
        flashcardId: ObjectId(id),
        email: email,
        expires: expires,
        deleteAfter: deleteAfter
    });
}

async function deleteShare(id) {
    return db.collection('shared').deleteOne({
        _id: ObjectId(id)
    });
}

async function getShare(id) {
    return db.collection('shared').findOne({
        _id: ObjectId(id)
    });
}

async function getShares(flashcardId) {
    return db.collection('shared').find({
        flashcardId: ObjectId(flashcardId)
    }).toArray();
}



module.exports = {
    connect,

    addAccount,
    getAccount,
    updateAccount,

    addRubrik,
    addStapel,
    addFlashcard,
    deleteFlashcard,

    getAllRubriken,
    getAllStapel,
    getAllKeywords,

    getFlashcard,
    getFlashcards,
    getStapelFlashcards,

    updateLernstatus,
    getStats,

    shareFlashcard,
    getShare,
    deleteShare,
    getShares
}
