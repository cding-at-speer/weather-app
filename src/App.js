import './App.css';
import React, { useState } from 'react';
const request = require('request');

function App() {
	const geocode = (address, callback) => {
		const url =
			'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=' +
			encodeURIComponent(address);
		request({ url, json: true }, (error, { body } = {}) => {
			if (error) {
				callback('Unable to connect to server');
			} else {
        console.log(body);
				callback(undefined, {
					longitude: body[0]['latt_long'].split(',')[1],
					latitude: body[0]['latt_long'].split(',')[0],
					location: body[0]['title'],
					woeid: body[0]['woeid']
				});
			}
		});
	};

	const forecast = (longitude, latitude, woeid, callback) => {
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

	const [ city, setCity ] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		// alert(`Submitting Name ${city}`);

		geocode(city, (error, { longitude, latitude, location, woeid } = {}) => {
			if (error) {
				alert('error happened');
			}

			forecast(longitude, latitude, woeid, (error, forecastdata) => {
				if (error) {
					alert('error happened');
				}
				alert('Weather: ' + forecastdata[0]['weather_state_name']);
			});
		});
	};
	return (
		<div>
			<h1>Weather App</h1>
			<form onSubmit={handleSubmit}>
				<label>
					City :
					<input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default App;
