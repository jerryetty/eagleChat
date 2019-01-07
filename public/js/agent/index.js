var socket = io('http://localhost:4201');

var $window = $(window);
var $users = $('#users-online'); //Users online Section
var $message = $('#inputMessage');

// If user presses return key on Keyboard, trigger the send message function
$message.keypress(function (event) {
    if (event.which == 13) {
        sendMessage();
    }
});

function sendMessage(params) {
    // getting the input from a user and storing it in a message variable
    var message = params.val();

    // TODO: Prevent markup from being injected into the message
    // message = cleanInput(message);

    // if there is a non-empty message
    params.val('');

    // tell server to execute 'createMessage' Event with the listed parameters
    socket.emit('agentMessage', {
        from: "Agent",
        text: message
    }, function () {
        // Callback
    });

    // Set variables to store the inputs from the client
    var from = "You say: ";
    var text = message;

    // TODO: Append client's message to chat
    // var html = jQuery('<div class="msg_b"></div>');
    // html.text(`${from} : ${text}`);

    // jQuery($newMsg).append(html);
}

// Connect to the server
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('initAgent', {
        name: 'Agent'
    });

    socket.on('usersOnline', function (params) {
        var html = '';
        var usernames = Object.keys(params)

        for (let i = 0; i < usernames.length; i++) {
            html +=

                '<div class="chat-user-item" id="' + usernames[i] + '">' +
                '<div class="chat-user-row row">' +
                '<div class="chat-avatar col-2">' +
                '<div class="chat-avatar-mode"><img src="images/userAvatar/domnic-brown.jpg" alt="Domnic Brown" class="user-avatar size-40" /><span class="chat-mode online"></span></div>' +
                '</div>' +
                '<div class="chat-info col-8"><span class="name h4">' + usernames[i] + '</span>' +
                '<div class="chat-info-des"></div>' +
                '<div class="last-message-time">Today</div>' +
                '</div>' +
                '<div class="chat-date col-2"><span class="badge badge-primary badge-circle">1</span></div>' +
                '</div>' +
                '</div>'

            $users.html(html);
        }
    });
});

// Disconnection from server
socket.on('disconnect', function () {
    console.log('Disconnected from server')
})