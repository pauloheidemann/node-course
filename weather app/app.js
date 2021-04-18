const request = require('postman-request')
const format = require('string-format')

const url = 'http://api.weatherstack.com/current?access_key=9dbb199d928c86c544cfab7fcbb3714a&query=37.8267,-122.4233'

request({ url: url, json: true }, (error, response) => {
    console.log(format('{0.weather_descriptions}. It\'s currently {temperature} degrees out. There\'s a {precip}% chance of rain', response.body.current))
})