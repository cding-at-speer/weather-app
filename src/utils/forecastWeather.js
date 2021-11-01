
const request = require('request');

const forecastWeather = (longitude, latitude, woeid, callback) => {
    console.log('longitude: ' + longitude);
    console.log('latitude" ' + latitude);
    console.log('woeid" ' + woeid);
    const url =
        'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + encodeURIComponent(woeid);
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback(error);
        } else if (body.error) {
            callback(body.error);
        } else {
            callback(undefined, body['consolidated_weather']);
        }
    });
};
module.exports = forecastWeather;