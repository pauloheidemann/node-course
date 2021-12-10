const socket = io()

setTimeout(function() {
    document.querySelector('#messageForm').addEventListener('submit', (e) => {
        e.preventDefault()
        socket.emit('sendMessage', document.querySelector('#text').value)
    })
}, 1000)

socket.on('message', (message) => {
    console.log(message)
})