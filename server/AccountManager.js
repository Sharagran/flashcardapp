const database = require('./Database');

async function updateAccount(id, email, username) {
    return database.updateAccount(id, email, username);
}

async function getAccount(id) {
    return database.getAccount({
        id: id
    });
}

module.exports = {
    updateAccount,
    getAccount
}
