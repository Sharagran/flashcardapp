const jwt = require('jsonwebtoken');

const SECRET = 'SECRET';

function sign(user) {
    try {
        const payload = { id: user.id, email: user.email };
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

function login(email, password) {    
}

function register(email, password) {
}

module.exports = {
    sign,
    verify,
    login,
    register
};
