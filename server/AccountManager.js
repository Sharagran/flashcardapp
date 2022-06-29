const database = require('./Database');
const uuidv4 = require('uuid').v4;

async function updateAccount(id, email, username) {
    return database.updateAccount(id, email, username);
}

async function getAccount(id) {
    return database.getAccount({
        id: id
    });
}

async function addFlashcard(creatorId, begriff, erklärung, rubrik, stapel, keyword_array, kommentar_array) {
    return database.addFlashcard(uuidv4(), begriff, erklärung, rubrik, stapel, keyword_array, kommentar_array, creatorId);
}

async function getFlashcards(query) {
    return database.getFlashcards(query);
}

async function getFields(accountid, fields) {
    var returnFields = {};
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var tmp = await database.getUniqueFlashcardFields(accountid, field);
        returnFields[field] = tmp;
    }
    return returnFields;
}



module.exports = {
    updateAccount,
    getAccount,
    addFlashcard,
    getFlashcards,
    getFields
}
