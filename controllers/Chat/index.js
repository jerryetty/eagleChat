var io = require('socket.io')(4100)

var { generateMessage } = require('./Utils/message')

// Object that will store all clients that connect
var clients = {}

// Object that will store all admins that are online
var agents = {}

// array that will store all rooms that are occupied
var rooms = []

// Array to store old messages that are populated when agent refreshes Window
// [ { room: '3rXp5oEy6ijyEOlfy2Lg', message: { from: 'Agent', text: 'gukt', createdAt: 1547152988393 } } ]
var oldMessages = []

module.exports = {
  io: io.on('connection', function (socket) {
    /**
    * Initialize the Agent.
    * This listener contains all functions related to and executed by the agent
    * This listener initializes the agent and adds them to all available rooms.
    * This will enable them chat with all clients that are currently active
    */

    socket.on('initAgent', function (params) {
      updateUsersOnline()
      getOldMessages()

      var name = params.name
      socket.name = name

      var agent = { name: socket.name }

      // Adding a new agent to the agents object created above
      agents = addToObject(agents, agent)

      // Checking if there are any clients online
      if (rooms.length > 0) {
        // Looping through the rooms array. This array contains all rooms that are currently occupied by clients
        for (let i = 0; i < rooms.length; i++) {
          socket.join(rooms[i])
        }
      } else {
        oldMessages = []
        console.log('No clients online')
      }

      socket.on('agentMessage', function (params, callback) {
        // socket.join(params.room)
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(socket.name, params.text))
        var roomID = params.room
        oldMessages.push({ room: roomID, message: generateMessage(socket.name, params.text) })
        getOldMessages()

        console.log(oldMessages[0].room)
      })
    })

    /**
    * Function to initialize the client after they have submitted their name
    */
    socket.on('initClient', function (params) {
      var name = params.Name
      var roomID = params.roomID

      socket.roomID = roomID
      socket.name = name

      var user = { roomID: socket.roomID, name: socket.name }

      var occupiedRooms = socket.roomID

      // Adding a new client to the clients object created above
      clients = addToObject(clients, user)

      // Pushing the unique room a client has joined to the rooms array created above
      rooms.push(occupiedRooms)

      // Client joining a unique room
      socket.join(socket.roomID)

      updateUsersOnline()

      // Listening for new messages
      socket.on('clientMessage', function (params, callback) {
        socket.broadcast.to(socket.roomID).emit('newMessage', generateMessage(socket.name, params.text))

        oldMessages.push({ room: socket.roomID, message: generateMessage(socket.name, params.text) })
        getOldMessages()
      })
    })

    /**
    * Function to add users and admins to the objects we created above
    */
    function addToObject (currentObject, item) {
      let newObject = Object.assign({}, currentObject)
      newObject[item.roomID] = item
      return newObject
    }

    /**
    * Function to update the list of users online
    */
    function updateUsersOnline () {
      io.emit('usersOnline', clients)
    }

    function getOldMessages () {
      io.emit('oldMessages', oldMessages)
    }

    /**
    * TODO: Add typing functionality
    */

    // Broadcasting to other users that someone just joined
    socket.broadcast.emit('infoMessage', generateMessage('Admin', 'New User Joined the chat'))

    // Welcome message when a new user joins the chat
    socket.emit('welcomeMessage', generateMessage('Admin', 'Hello, Welcome to EagleChat'))

    /**
    * Socket Listener for the disconnect event from a client
    * TODO: Remove client from clients object
    * TODO: Remove room from occupiedRooms array
    */
    socket.on('disconnect', function () {
      var roomID = socket.roomID
      if (!roomID) {
        return
      } else {
        for (let i = 0; i < oldMessages.length; i++) {
          if (oldMessages[i].room === roomID) {
            var index = oldMessages.indexOf(oldMessages[i])
            if (index > -1) {
              oldMessages.splice(index, i)
            }
            // console.log(roomID)
          }
        }
        delete clients[socket.roomID]
        updateUsersOnline()
      }
      console.log('A User disconnected')
    })
  })
}
