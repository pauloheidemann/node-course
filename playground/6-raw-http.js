const https = require('https')
const url = 'https://www.googlesss.com'

const request = 
    https.request(url, (response) => {
        let data = ''
        response.on('data', (chunk) => {
            data = data + chunk.toString()
        })

        response.on('end', () => {
            console.log(data)
        })

    })

request.on('error', error => {
    console.log('Error', error)
})

request.end()