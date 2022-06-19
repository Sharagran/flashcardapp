const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const verifier = require('./verifier');

const app = express();

app.use(cors());

// public routes which don't require authentication
const excluded_urls = [
    '/',
    '/login'
];

app.use(verifier(excluded_urls));
app.use(routes);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

