var firebase = require('firebase')
require('firebase/auth')
require('firebase/database')

// Initialize Firebase for the application
var config = {
  apiKey: 'AIzaSyDCke7W_vkbjhBRBRBrf9a1uvSOqwm9jz4',
  authDomain: 'eaglechat-533c7.firebaseapp.com',
  databaseURL: 'https://eaglechat-533c7.firebaseio.com',
  projectId: 'eaglechat-533c7',
  storageBucket: 'eaglechat-533c7.appspot.com',
  messagingSenderId: '398955216542'
}

firebase.initializeApp(config)
