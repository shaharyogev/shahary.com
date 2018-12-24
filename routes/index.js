var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.sendFile('D:/Dropbox/Coding/Javascript/shahary.com/shahary.com/indexnew.html')
  res.sendFile('c:/Users/Shahar Yogev LP/Dropbox/Coding/Javascript/shahary.com/shahary.com/indexnew.html')

});


module.exports = router;
