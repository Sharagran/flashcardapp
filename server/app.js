const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const routes = require('./routes');
const verifier = require('./verifier');

const app = express();

app.use(bodyparser.json());
app.use(cors());
app.use(fileUpload());


app.use((req, res, next) => {
    // log all request
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use(verifier);
app.use(routes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

