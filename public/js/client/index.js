var socket = io('http://localhost:4201');

var $window = $(window);
var $chatTitle = $('.chat_box_title');
var $messages = $('#messages'); //Message area
var $inputMessage = $('#inputMessage');  //Message input field
var $nameInput = $('#nameInput') //Name input field
var $form = $('.formArea'); // Details form
var $widgetBox = $('.contentArea'); //Widget box
var $input = $('.inputFields'); //name input container
var $chatBox = $('.chatArea'); //Chat container
var $typing = $(".typing") //Typing notification
var $oldMsg = $('.old_msg'); //Dummy to push old msgs
var $newMsg = $('.new_msg'); //Dummy to push new

// toggle chat widget using jQuery
$chatTitle.click(function () {
    $widgetBox.slideToggle('fast');
});

// Action after client submits their name
$input.submit(function (e) {
    e.preventDefault();
    $form.hide();
    $chatBox.show();
    $inputMessage.focus();

    // Initialize client with their name and roomID
    socket.emit('initClient', {
        roomID: makeid(),
        Name: $nameInput.val().trim()
    });
});

// If user presses return key on Keyboard, trigger the send message function
$inputMessage.keypress(function (event) {
    if (event.which == 13) {
        sendMessage();
    }
})

// Send Message Function
function sendMessage() {

    // getting the input from a user and storing it in a message variable
    var message = $inputMessage.val();

    // TODO: Prevent markup from being injected into the message
    // message = cleanInput(message);

    // if there is a non-empty message
    $inputMessage.val('');

    // Tell server to execute 'createMessage' Event with the listed parameters
    socket.emit('clientMessage', {
        from: "Client says: ",
        text: message
    }, function () {
        // Callback
    });

    // Set variables to store the inputs from the client
    var from = "You say: ";
    var text = message;

    // Append client's message to chat
    var html = jQuery('<div class="sent_msg"></div>');
    html.text(`${from} : ${text}`);

    jQuery($newMsg).append(html);
}

// Function to generate random a random key that is used as the client's roomID
function makeid() {
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        key += possible.charAt(Math.floor(Math.random() * possible.length));

    return key;
}

// Making a socket connection to the server
socket.on('connect', function(){
    console.log('Connected to server');

    // Listening for a new message from the server and displaying it in the client
    socket.on('newMessage', function (params) {
        var html = jQuery('<div class="received_msg"></div>');
        html.text(`${params.from}: ${params.text}`);

        jQuery($newMsg).append(html);
    });
});

// Disconnection from server
socket.on('disconnect', function () {
    console.log('Disconnected from server')
});


