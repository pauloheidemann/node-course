const socket = io()

setTimeout(function() {
    //Elements
    const $messageForm = document.querySelector('#messageForm')
    const $messageFormInput = document.querySelector('#text')
    const $messageFormButton = $messageForm.querySelector('button')

    const $locationButton = document.querySelector('#send-location')

    $messageForm.addEventListener('submit', (e) => {
        e.preventDefault()
        $messageFormButton.setAttribute('disabled', 'disabled')
        socket.emit('sendMessage', $messageFormInput.value, (message) => {
            console.log('Return from server', message)
            $messageFormButton.removeAttribute('disabled')
            $messageFormInput.value = ''
            $messageFormInput.focus()
        })
    })

    $locationButton.addEventListener('click', () => {
        if(!navigator.geolocation) {
            return alert('Geolocation not supported!')
        }

        $locationButton.setAttribute('disabled', 'disabled')

        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('sendLocation', {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }, (callBackResponse) => {
                console.log(callBackResponse)
                $locationButton.removeAttribute('disabled')
            })
        })
    })
}, 1000)

socket.on('message', (message) => {
    const $messagesDiv = document.querySelector('#messages')
    const messageTemplate = document.querySelector('#message-template').innerHTML
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messagesDiv.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (location) => {
    const $messagesDiv = document.querySelector('#messages')
    const messageTemplate = document.querySelector('#location-message-template').innerHTML
    const html = Mustache.render(messageTemplate, {
        location
    })
    $messagesDiv.insertAdjacentHTML('beforeend', html)
})