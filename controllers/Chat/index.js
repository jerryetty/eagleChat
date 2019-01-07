var io = require('socket.io')(4201);

var { generateMessage } = require('./Utils/message');

// Object that will store all clients that connect
var clients = {};

// Object that will store all admins that are online
var agents = {};

// Object that will store all rooms that are occupied
var rooms = {};

module.exports = {
    io: io.on('connection', function (socket) {
        /*
        * Initialize the Agent. 
        * This listener contains all functions related to and executed by the agent
        * 
        * This listener initializes the agent and adds them to all available rooms.
        * This will enable them chat with all clients that are currently active
        */

        socket.on('initAgent', function (params) {
            var name = params.name;
            socket.name = name;

            var agent = { name: socket.name };

            // Adding a new agent to the agents object created above
            agents = addToObject(agents, agent);

            // Checking if there are any clients online
            if (rooms.length > 0) {
                // Looping through the rooms array. This array contains all rooms that are currently occupied by clients
                for (let i = 0; i < rooms.length; i++) {
                    socket.join(rooms[i]);
                }

                newMessage('adminMessage', roomID);

            } else {
                console.log('No clients online');

            }

        });

        /* 
        * Function to initialize the client after they have submitted their name
        */
        socket.on('initClient', function (params) {

            var name = params.Name;
            var email = params.Email;
            var roomID = params.roomID;

            socket.roomID = roomID;
            socket.name = name;
            socket.email = email;

            var user = { name: socket.name, email: socket.email, roomID: socket.roomID };
            var occupiedRooms = socket.roomID;


            // Adding a new client to the clients object created above
            clients = addToObject(clients, user);

            // Client joining a unique room
            socket.join(socket.roomID);

            updateUsersOnline();

            // Listening for new messages
            newMessage('clientMessage', socket.roomID);
        });

        /* 
        * Socket Listener for New messages
        */
        function newMessage(listener, room) {
            socket.on(listener, function (params, callback) {
                socket.broadcast.to(room).emit('newMessage', generateMessage(socket.name, params.text));
                callback('Your message was received');
            });
        }

        /* 
        * Function to add users and admins to the objects we created above
        */
        function addToObject(currentObject, item) {
            let newObject = Object.assign({}, currentObject);
            newObject[item.name] = item;
            return newObject;
        }

        /* 
        * Function to update the list of users online
        */
        function updateUsersOnline() {
            io.emit('usersOnline', clients);
        }

        /*
        * TODO: Add typing functionality
        */

        // Broadcasting to other users that someone just joined
        socket.broadcast.emit('infoMessage', generateMessage('Admin', 'New User Joined the chat'));

        // Welcome message when a new user joins the chat
        socket.emit('welcomeMessage', generateMessage('Admin', 'Hello, Welcome to EagleChat'));

        /* 
        * Socket Listener for the disconnect event from a client
        * TODO: Remove client from clients object
        * TODO: Remove room from occupiedRooms array
        */
        socket.on('disconnect', function () {
            if (!socket.name) {
                return;
            } else {
                delete clients[socket.name];
                updateUsersOnline();
            }
            console.log('A User disconnected');
        })

    })
}
