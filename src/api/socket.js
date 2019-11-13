const express = require('express')
const app = express.Router

const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(3001)
console.log('Socket wait on 3001')

const Socket = {
  socket: null
}

io.on('connection', function(_socket) {
  console.log('Connection etablished')
  Socket.socket = _socket
})

module.exports = Socket