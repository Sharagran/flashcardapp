const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcrypt');

const database = require('./Database');
database.connect();

const SECRET = 'SECRET';


function hash_password(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function compare_hash(password, hashFromDB) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashFromDB, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function sign(id, email, username) {
    try {
        const payload = { id: id, email: email, username: username };
        const token = jwt.sign(payload, SECRET); //TODO: expiresIn (implement 30min login timeout)
        return token;
    } catch (error) {
        console.error(error.stack);
        return;
    }
}

function verify(token, callback) {
    jwt.verify(token, SECRET, callback);
}

async function login(email, password) {
    const account = await database.getAccountByEmail(email);
    if (!account) {
        console.log('No account found with email: ' + email);
        return null;
    }
    const hash = account.password;
    const isValid = await compare_hash(password, hash);
    if (!isValid) {
        console.log('Invalid password for account with email: ' + email);
        return null;
    }
    return sign(account.id, account.email, account.username);
}

function register(email, username, password) {
    const id = uuidv4();
    const hash = hash_password(password);
    return database.addAccount(id, email, username, hash);
}

module.exports = {
    verify,
    login,
    register
};
