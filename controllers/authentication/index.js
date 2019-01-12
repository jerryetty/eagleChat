var firebase = require('firebase')
require('../../config/firebase')

module.exports = {
  isAuthenticated: function (req, res, next) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        req.user = user
        next()
      } else {
        res.redirect('login')
      }
    })
  },

  loginGET: function (req, res, next) {
    res.render('auth/login', { title: 'EagleChat || Login' })
  },

  loginPOST: function (req, res, next) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        req.user = user
        res.redirect('chat')
      }
    })
    var email = req.body.email
    var password = req.body.password

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code
      var errorMessage = error.message

      var errorAlert = '<div class="alert alert-danger">' + errorMessage + '</div>'

      res.render('auth/login', { title: 'EagleChat || Login', error: errorAlert })
    })
  },

  logout: function (req, res, next) {
    firebase.auth().signOut().then(function () {
      res.redirect('login')
    }).catch(function (error) {
      console.log(error)
    })
  }
}
