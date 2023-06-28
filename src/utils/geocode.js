const request = require('request')

const maps_token = 'pk.eyJ1IjoidGhhbnN0IiwiYSI6ImNsajQ3dWd3dzFoeDUzaHMzdnZ0Y3RqaDUifQ.5TW4Z8POGIH6BQo1nNDLPQ'

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + maps_token + '&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(error, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode