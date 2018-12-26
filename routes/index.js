var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  resolve = require('path').resolve
  res.sendFile(resolve('./indexnew.html'));
});


module.exports = router;
