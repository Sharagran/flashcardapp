const router = require('express').Router();
const authenticator = require('./Authenticator');
const accountManager = require('./AccountManager');

const database = require('./Database');


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
  const { begriff, erklärung, stapel, keyword_array, kommentar_array } = req.body;

  try {
    console.log(begriff, erklärung, keyword_array, kommentar_array, stapel);
    await database.addFlashcard(begriff, erklärung, keyword_array, kommentar_array, stapel);
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
  var query = {};
  if (rubrik) {
    query = { rubrik: rubrik };
  } else if (stapel) {
    query = { stapel: stapel };
  } else if (keyword) {
    query = { keyword_array: keyword};
  }
  query.creatorId = req.account.id;

  try {
    console.log(query);
    query = {}; //FIXME: debug only
    const flashcards = await accountManager.getFlashcards(query);
    console.log(flashcards);
    res.json(flashcards);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
  
});

router.get('/getRubriken', async (req, res) => {
  try {
    const rubriken = await database.getAllRubriken(req.account.id);
    // const rubriken = await database.getAllRubriken("testID");
    console.log(rubriken);
    res.json(rubriken);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.get('/getStapel', async (req, res) => {
  const { rubrik } = req.query;
  try {
    const stapel = await database.getAllStapel(rubrik);
    res.json(stapel);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.get('/getKeywords', async (req, res) => {
  try {
    const keywords = await database.getAllKeywords("testID2");
    console.log(keywords);
    res.json(keywords);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.post('/createRubrik', async (req, res) => {
  const {name } = req.body;
  try {
    await database.addRubrik(name, req.account.id);
    res.json({
      message: "Rubrik created!"
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.post('/createStapel', async (req, res) => {
  const { name, rubrikId } = req.body;
  try {
    await database.addStapel(name, rubrikId);
    res.json({
      message: "Stapel created!"
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.get('/test', async (req, res) => {
  // Database.getAllRubriken().then(result => {
  //   console.log(result);
  //   res.json(result);
  // });

  Database.getAllKeywords("testID2").then(result => {
    console.log(result);
    res.json(result);
  });

});


module.exports = router;
