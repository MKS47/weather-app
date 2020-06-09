const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=99aa413d3a9ed1b8fdd841d651a83427&query=${latitude},${longitude}`

    request({ url: weatherStackUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find the weather data, Try another search', undefined)
        } else {
            callback(undefined, {
                weatherStatus: `Weather is ${body.current.weather_descriptions} It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`
            })
        }
    })
}

module.exports = forecast