const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { SocketAddress } = require('net')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('message', 'Welcome!')//message to just the emitter
    socket.broadcast.emit('message', 'A new user has joined!') //broadcast message to everyone but the emitter

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profane word')
        }

        io.emit('message', message) //message to everyone
        callback('Delivered')
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${location.lat},${location.lon}`) //broadcast message to everyone but the emitter
        callback('Location shared')
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })

    // socket.emit('countUpdated', count) // Socket emits the event to a single client, io sends to all connected clients

    // socket.on('increment', () => {
    //     count++
    //     io.emit('countUpdated', count)
    // })
})

module.exports = server