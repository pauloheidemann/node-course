const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    // socket.emit('countUpdated', count) // Socket emits the event to a single client, io sends to all connected clients

    // socket.on('increment', () => {
    //     count++
    //     io.emit('countUpdated', count)
    // })
})

module.exports = server