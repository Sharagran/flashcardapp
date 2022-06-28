const router = require('express').Router();
const authenticator = require('./Authenticator');

router.get('/1', async (req, res) => {
  const x = await authenticator.register("filipmas@gmail.com", "Sharagra", "123456");
  res.json(x);
});

router.get('/2', async (req, res) => {
  const token = await authenticator.login("filipmas@gmail.com", "123456");
  authenticator.verify(token, (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      res.json(decoded);
    }
  }
  );
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
