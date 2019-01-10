var express = require('express')
var router = express.Router()
var agentController = require('../controllers/Chat/agent')

/* GET client Window. */
router.get('/', function (req, res, next) {
  res.render('client', { title: 'EagleChat Client' })
})

// /* GET agent Window. */
// router.get('/agent', function (req, res, next) {
//   res.render('agent', { title: 'EagleChat Agent' });
// });

/* GET agent Window. */
router.get('/agent', agentController.index)

module.exports = router
