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


module.exports = {
    updateAccount,
    getAccount,
    addFlashcard,
    getFlashcards
}

//TODO: remove accountManager file and use db directly
