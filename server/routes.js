const router = require('express').Router();
const authenticator = require('./Authenticator');

router.get('/', (req, res) => {
  // working 28.06.2022
  // database.addAccount("filipmaas@gmail.com", "Sharagran", "123456");
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = authenticator.login(email, password);

  res.send({
    token: token
  });
});

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const token = authenticator.sign(email, password);

  authenticator.register(email, password);

  // Remove this
  res.send({
    token: token
  });
});

router.get('/test', (req, res) => {
  res.send('test');
});

module.exports = router;
