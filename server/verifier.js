const authenticator = require('./Authenticator');

module.exports = authenticate;


function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    // Wenn der Nutzer einen Token hat
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        // Token validieren
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

            // Nutzerdaten aus dem Token holen
            req.account = decoded;
            next();
        });
    } else {
        console.log('No token specified');
        next();
    }
}


