const router = require('express').Router();
const authenticator = require('./Authenticator');
const accountManager = require('./AccountManager');

router.get('/1', async (req, res) => {
  try {
    const insertionResult = await authenticator.register("filipmas@gmail.com", "Sharagra", "123456");
    res.json(insertionResult);
  } catch (error) {
    res.status(401).json({
      error: error.message
    });
  }
  
  
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

router.get('/3', async (req, res) => {
  res.json(req.account);
});


//TODO: fix error codes
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authenticator.login(email, password);
    res.json({
      token: token
    });
  } catch (error) {
    res.status(401).json({
      error: error.message
    });
  }
});

router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    await authenticator.register(email, username, password);
    const token = await authenticator.login(email, password);
    res.json({
      token: token
    });
  } catch (error) {
    res.status(401).json({
      error: error.message
    });
  }
});

router.route('/accountData')
  .get( async (req, res) => {
    const account = await accountManager.getAccount(req.account.id);
    res.json({
      email: account.email,
      username: account.username,
      avatar: account.avatar
    });
  })
  .post(async (req, res) => {
    const { email, username, avatar } = req.body;
    try {
      await accountManager.updateAccount(req.account.id, email, username, avatar);
      res.json({
        message: "Account updated"
      });
    }
    catch (error) {
      console.log(error);
      res.status(401).json({
        error: error.message
      });
    }
  }
);

module.exports = router;
