const authenticator = require('./Authenticator');

module.exports = authenticate;


function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        authenticator.verify(token, (err, decoded) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    console.log("Token expired");
                    return next();
                } else {
                    console.error(err.stack);
                    return res.sendStatus(403);
                }
            }

            req.account = decoded;
            next();
        });
    } else {
        console.log('No token specified');
        next();
    }
}


