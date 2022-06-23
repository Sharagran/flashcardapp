const router = require('express').Router();
const authenticator = require('./Authenticator');

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = authenticator.sign(email, password);

  authenticator.login(email, password);
  //TODO: save token in database

    res.send({
      token: token
    });
  });

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const token = authenticator.sign(email, password);

  authenticator.register(email, password);
  //TODO: save token in database

  res.send({
    token: token
  });
});

router.get('/test', (req, res) => {
  res.send('test');
});

module.exports = router;
