const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const address = process.argv[2]

if (!address) {
    return console.log('Provide a valid address')
}
geoCode(address, (response) => {
    forecast(response)
})