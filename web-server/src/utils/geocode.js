const request = require('postman-request')

const geoCode = (address, callback) => {
    const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGF1bG9oZWlkZW1hbm4iLCJhIjoiY2tubmNwYTFiMTNoODJ4cG41eDU2ZHJhbSJ9.7RdHU7FAT_gC1JARse3vfA&limit=1`
    request({url: geoCodingUrl, json:true}, (error, response) => {
        if(error) {
            console.log('error', error)
        } else {
            callback(response.body)
        }
    })
}

module.exports = geoCode