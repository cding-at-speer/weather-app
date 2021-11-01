const request = require('request');

const woeidInfo = (address, callback) => {
	const url =
		'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=' +
		encodeURIComponent(address);
	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to server');
		} else if (!body || body.length < 1) {
			callback('No data available');
		} else {
			callback(undefined, {
				longitude: body[0]['latt_long'].split(',')[1],
				latitude: body[0]['latt_long'].split(',')[0],
				location: body[0]['title'],
				woeid: body[0]['woeid']
			});
		}
	});
};
module.exports = woeidInfo;
