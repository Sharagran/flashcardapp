const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

module.exports = router;
