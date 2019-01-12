var express = require('express')
var router = express.Router()
var firebase = require('../controllers/authentication')

var authController = require('../controllers/authentication')
var agentController = require('../controllers/Chat/agent')

/* GET client chat Window. */
router.get('/', function (req, res, next) {
  res.render('client', { title: 'EagleChat Client' })
})

/* GET agent Chat Window. */
router.get('/chat', firebase.isAuthenticated, agentController.index)

/* GET Tickets Window. */
router.get('/tickets', firebase.isAuthenticated, agentController.tickets)

/* GET Agent Window. */
router.get('/agent', firebase.isAuthenticated, agentController.agent)

/* GET Help Window. */
router.get('/help', firebase.isAuthenticated, agentController.help)

/* GET Login */
router.get('/login', authController.loginGET)

/* POST Login */
router.post('/login', authController.loginPOST)

/* Logout */
router.get('/logout', authController.logout)

module.exports = router
