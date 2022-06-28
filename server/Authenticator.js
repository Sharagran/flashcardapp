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
    const account = await database.getAccount({
        email: email
    });
    if (!account) {
        console.log('No account found with email: ' + email);
        throw new Error('No account found with email: ' + email);
    }
    const hash = account.password;
    const isValid = await compare_hash(password, hash);
    if (!isValid) {
        console.log('Invalid password for account with email: ' + email);
        throw new Error('Invalid password for account with email: ' + email);
    }
    const token = sign(account.id, account.email, account.username);
    return token;
}

async function register(email, username, password) {
    // check if account already exists
    const account = await database.getAccount({
        email: email,
        username: username
    });
    if (account) {
        if (account.email === email) {
            console.log('Account with email ' + email + ' already exists');
            throw new Error('Account with email ' + email + ' already exists');
        } else if (account.username === username) {
            console.log('Account with username ' + username + ' already exists');
            throw new Error('Account with username ' + username + ' already exists');
        }
    }

    // create account
    const id = uuidv4();
    const hash = await hash_password(password);
    const insertionResult = await database.addAccount(id, email, username, hash);
    return insertionResult;
}

module.exports = {
    verify,
    login,
    register
};
