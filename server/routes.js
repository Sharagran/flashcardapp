const router = require('express').Router();
const authenticator = require('./Authenticator');
const database = require('./Database');
const nodemailer = require("nodemailer");

const fs = require('fs');


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
    const account = await database.getAccount({
      id: req.account.id
    });
    res.json({
      email: account.email,
      username: account.username,
      avatar: account.avatar
    });
  })
  .post(async (req, res) => {
    const { email, username, avatar } = req.body;
    try {
      await database.updateAccount(req.account.id, email, username, avatar);
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

// TODO: update this, flashcard haben keine rubrik
router.get('/getFlashCards', async (req, res) => {
  const { rubrik, stapel, keyword } = req.query;
  var query = {};
  if (rubrik) {
    query = { rubrik: rubrik };
  } else if (stapel) {
    query = { stapel: stapel };
  } else if (keyword) {
    query = { keyword_array: keyword };
  }
  query.creatorId = req.account.id;

  try {
    console.log("getFlashCards");
    console.log(query);
    query = {}; //FIXME: debug only
    const flashcards = await database.getFlashcards(query);
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
    const keywords = await database.getAllKeywords(req.account.id);
    res.json(keywords);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.post('/createRubrik', async (req, res) => {
  const { name } = req.body;
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

router.post('/setLernStatus', async (req, res) => {
  const { id, lernStatus } = req.body;
  console.log(id, lernStatus);
  try {
    await database.updateLernstatus(id, lernStatus);
    res.json({
      message: "LernStatus updated!"
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.get('/getStats', async (req, res) => {
  try {
    const stats = await database.getStats(req.account.id);
    res.json(stats);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.post('/upload', async (req, res) => {
  //create user folder if not exists
  fs.mkdirSync(`./uploads/${req.account.id}`, { recursive: true });

  const { files } = req.files;

  //check if array
  if (Array.isArray(files)) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = `${__dirname}/uploads/${req.account.id}/${file.name}`;

      file.mv(path, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err
          });
        }
      });
    }
  } else {
    const file = files;
    console.log(file);
    const path = `${__dirname}/uploads/${req.account.id}/${file.name}`;

    file.mv(path, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: err
        });
      }
    });
  }

  res.json({
    message: "File(s) uploaded!"
  });

});

function sendShareLink(receiver, shareLink) {
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'flashcardapp.krause@gmail.com', pass: 'dhyipkuouefdqukc' }, });
  var mailOptions = {
    from: 'flashcardapp.krause@gmail.com',
    to: receiver,
    subject: 'Eine Flashcard wurde mit ihnen geteilt',
    text: "Hier der Link zur flashcard: " + shareLink
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error.stack);
      throw error;
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

router.post('/share', async (req, res) => {
  const { id, email, expires, deleteAfter } = req.body;
  try {
    const share = await database.shareFlashcard(id, email, expires, deleteAfter);

    const shareLink = `http://localhost:3000/share/${share.insertedId}`;
    sendShareLink(email, shareLink);

    res.json({
      message: "Flashcard shared!",
      shareId: share.insertedId
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.get('/share', async (req, res) => {
  const { shareId } = req.query;
  try {
    const share = await database.getShare(shareId);
    const expires = new Date(share.expires);
    const now = new Date();
    if (now >= expires) {
      await database.deleteShare(shareId);
      res.json({
        message: "Share expired!"
      });
    } else {
      const flashcard = await database.getFlashcard(share.flashcardId);
      res.json(flashcard);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message
    });
  }
});

router.post('/confirmShareDownload', async (req, res) => {
  const { id } = req.body;
  try {
    const share = await database.getShare(id);
    const flashcardId = share.flashcardId;
    const shares = await database.getShares(flashcardId);

    if (shares.length === 0) {
      await database.deleteFlashcard(flashcardId);
      res.json({
        message: "Flashcard deleted!"
      });
    } else {
      res.json({
        message: "Flashcard not deleted!"
      });
    }
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
