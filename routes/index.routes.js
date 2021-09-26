var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('Hey Form Me - API Online');
});

module.exports = router;
