// eslint-disable-next-line no-undef
var socket = io('http://localhost:4100')

// eslint-disable-next-line no-undef
var $users = $('#users-online') // Users online Section

// eslint-disable-next-line no-undef
var $message = $('#inputMessage')

// eslint-disable-next-line no-undef
var $roomID = $('#roomID')

// If user presses return key on Keyboard, trigger the send message function
$message.keypress(function (event) {
  if (event.which === 13) {
    sendMessage($message, $roomID)
  }
})

function sendMessage (msg, room) {
  var message = msg.val()
  var roomID = room.val()
  // TODO: Prevent markup from being injected into the message
  // message = cleanInput(message);

  // Clearing the message input box to accept another message
  msg.val('')

  // tell server to execute 'createMessage' Event with the listed parameters
  socket.emit('agentMessage', {
    from: 'Agent',
    text: message,
    room: roomID
  }, function () {
    // Callback
  })

  /**
   * TODO: Append Agent's message to chat
  */

  // Set variables to store the inputs from the client
  var time = '8.30p'
  var text = message

  // Append client's message to chat
  var html =
    '<div class="d-flex flex-nowrap chat-item flex-row-reverse"><img src="images/userAvatar/domnic-harris.jpg" alt="..." class="user-avatar"/>' +
    '<div class="bubble">' +
    '<div class="message">' + text + '</div>' +
    '<div class="time"><em><small>' + time + '</small></em></div>' +
    '</div>' +
    '</div>'

  // eslint-disable-next-line no-undef
  var $chatContainer = $('.chat-main-content')

  // eslint-disable-next-line no-undef
  jQuery($chatContainer).append(html)
}

// Connect to the server
socket.on('connect', function () {
  console.log('Connected to server')
  // console.log(req.param('roomID'))

  socket.emit('initAgent', {
    name: 'Agent'
  })

  // Listening for a new message from the server and displaying it in the client
  socket.on('newMessage', function (params) {
    // Set variables to store the inputs from the client
    var time = '8.30p'
    var text = params.text

    // Append client's message to chat
    var html =
      '<div class="d-flex flex-nowrap chat-item flex-row"><img src="images/userAvatar/domnic-harris.jpg" alt="..." class="user-avatar"/>' +
      '<div class="bubble">' +
      '<div class="message">' + text + '</div>' +
      '<div class="time"><em><small>' + time + '</small></em></div>' +
      '</div>' +
      '</div>'

    // eslint-disable-next-line no-undef
    var $chatContainer = $('.chat-main-content')

    // eslint-disable-next-line no-undef
    jQuery($chatContainer).append(html)
  })

  socket.on('usersOnline', function (params) {
    var html = ''
    var keys = Object.keys(params)

    for (let i = 0; i < keys.length; i++) {
      html +=
        '<a href="agent?roomID=' + params[keys[i]].roomID + '&user=' + params[keys[i]].name + '">' +
        '<div class="chat-user-item" id="' + params[keys[i]].roomID + '">' +
        '<div class="chat-user-row row">' +
        '<div class="chat-avatar col-2">' +
        '<div class="chat-avatar-mode"><img src="images/userAvatar/domnic-brown.jpg" alt="Domnic Brown" class="user-avatar size-40" /><span class="chat-mode online"></span></div>' +
        '</div>' +
        '<div class="chat-info col-8"><span class="name h4">' + params[keys[i]].name + '</span>' +
        '<div class="chat-info-des"></div>' +
        '<div class="last-message-time">Today</div>' +
        '</div>' +
        '<div class="chat-date col-2"><span class="badge badge-primary badge-circle">1</span></div>' +
        '</div>' +
        '</div>' +
        '</a>'

      $users.html(html)
    }

    // selectChat(params);
  })
})

// Disconnection from server
socket.on('disconnect', function () {
  console.log('Disconnected from server')
})
