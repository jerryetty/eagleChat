var express = require('express')
var router = express.Router()
var agentController = require('../controllers/Chat/agent')

/* GET client chat Window. */
router.get('/', function (req, res, next) {
  res.render('client', { title: 'EagleChat Client' })
})

/* GET agent Chat Window. */
router.get('/chat', agentController.index)

/* GET Tickets Window. */
router.get('/tickets', agentController.tickets)

/* GET Agent Window. */
router.get('/agent', agentController.agent)

/* GET Help Window. */
router.get('/help', agentController.help)

module.exports = router
