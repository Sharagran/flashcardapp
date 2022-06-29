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
  .get(async (req, res) => {
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

router.post('/create', async (req, res) => {
  const { begriff, erklärung, rubrik, stapel, keyword_array, kommentar_array } = req.body;

  try {
    await accountManager.addFlashcard(req.account.id, begriff, erklärung, rubrik, stapel, keyword_array, kommentar_array);
    res.json({
      message: "Flashcard created!"
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});





router.get('/getFlashCards', async (req, res) => {
  const { rubrik, stapel, keyword } = req.query;
  var query;
  if (rubrik) {
    query = { rubrik: rubrik };
  } else if (stapel) {
    query = { stapel: stapel };
  } else if (keyword) {
    query = { keyword_array: keyword};
  }
  query.creatorId = req.account.id;

  try {
    const flashcards = await accountManager.getFlashcards(query);
    res.json(flashcards);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
  
});

router.get('/getFields', async (req, res) => {
  try {
    const fields = await accountManager.getFields(req.account.id, ['rubrik', 'stapel', 'keyword_array']);
    res.json(fields);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

module.exports = router;
