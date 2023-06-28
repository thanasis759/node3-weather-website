const request = require('request')

const weather_token = '59835c4343ce07523e11e66ebcbed4a4'

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + weather_token + '&query=' + latitude + ',' + longitude
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(error, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast