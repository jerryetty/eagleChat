// eslint-disable-next-line no-undef
var socket = io('http://localhost:4100')

// eslint-disable-next-line no-undef
var $chatTitle = $('.chat_box_title')

// eslint-disable-next-line no-undef
var $inputMessage = $('#inputMessage') // Message input field

// eslint-disable-next-line no-undef
var $nameInput = $('#nameInput') // Name input field

// eslint-disable-next-line no-undef
var $form = $('.formArea') // Details form

// eslint-disable-next-line no-undef
var $widgetBox = $('.contentArea') // Widget box

// eslint-disable-next-line no-undef
var $input = $('.inputFields') // name input container

// eslint-disable-next-line no-undef
var $chatBox = $('.chatArea') // Chat container

// eslint-disable-next-line no-undef
var $newMsg = $('.new_msg') // Dummy to push new

// eslint-disable-next-line no-undef

// toggle chat widget using jQuery
$chatTitle.click(function () {
  $widgetBox.slideToggle('fast')
})

// Action after client submits their name
$input.submit(function (e) {
  e.preventDefault()
  $form.hide()
  $chatBox.show()
  $inputMessage.focus()

  // Initialize client with their name and roomID
  socket.emit('initClient', {
    roomID: makeid(),
    Name: $nameInput.val().trim()
  })
})

// If user presses return key on Keyboard, trigger the send message function
$inputMessage.keypress(function (event) {
  if (event.which === 13) {
    sendMessage()
  }
})

// Send Message Function
function sendMessage () {
  // getting the input from a user and storing it in a message variable
  var message = $inputMessage.val()

  // TODO: Prevent markup from being injected into the message
  // message = cleanInput(message);

  // if there is a non-empty message
  $inputMessage.val('')

  // Tell server to execute 'createMessage' Event with the listed parameters
  socket.emit('clientMessage', {
    from: 'Client says: ',
    text: message
  }, function () {
    // Callback
  })

  // Set variables to store the inputs from the client
  var from = 'You say: '
  var text = message

  // Append client's message to chat
  // eslint-disable-next-line no-undef
  var html = jQuery('<div class="sent_msg"></div>')
  html.text(`${from} : ${text}`)

  // eslint-disable-next-line no-undef
  jQuery($newMsg).append(html)
}

// Function to generate random a random key that is used as the client's roomID
function makeid () {
  var key = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 20; i++) { key += possible.charAt(Math.floor(Math.random() * possible.length)) }

  return key
}

// Making a socket connection to the server
socket.on('connect', function () {
  console.log('Connected to server')

  // Listening for a new message from the server and displaying it in the client
  socket.on('newMessage', function (params) {
    // eslint-disable-next-line no-undef
    var html = jQuery('<div class="received_msg"></div>')
    html.text(`${params.from}: ${params.text}`)

    // eslint-disable-next-line no-undef
    jQuery($newMsg).append(html)
  })
})

// Disconnection from server
socket.on('disconnect', function () {
  console.log('Disconnected from server')
})
