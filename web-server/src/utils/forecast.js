const request = require('postman-request')

const forecast = (response) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=9dbb199d928c86c544cfab7fcbb3714a&query='
    const coordinate = response.features[0].center
    const query = weatherUrl + coordinate[0] + ',' + coordinate[1]
    console.log(query)
    request({url:query, json:true}, (error, response) => {
        if(error) {
            console.log('error', error)
        } else if (response.body.error) {
            console.log('error', response.body.error.info)
        } else {
            console.log('sucesso', response.body)
        }
    })
}

module.exports = forecast