var express = require('express');
var router = express.Router();

/* GET client Window. */
router.get('/', function (req, res, next) {
  res.render('client', { title: 'EagleChat Client' });
});

/* GET agent Window. */
router.get('/agent', function (req, res, next) {
  res.render('agent', { title: 'EagleChat Client' });
});

module.exports = router;
