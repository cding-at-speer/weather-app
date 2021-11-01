import './App.css';
import React, { useState } from 'react';
const woeidInfo = require('./utils/woeidInfo');
const forecastWeather = require('./utils/forecastWeather');

function App() {
	const [ city, setCity ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ airPressure, setAirPressure ] = useState('');
	const [ currentDate, setCurrentDate ] = useState('');
	const [ humidity, setHumidity ] = useState('');
	const [ maxTemp, setMaxTemp ] = useState('');
	const [ minTemp, setMinTemp ] = useState('');
	const [ predictability, setPredictability ] = useState('');
	const [ weatherState, setWeatherState ] = useState('');
	const [ windDirection, setWindDirection ] = useState('');

	const Result = () => (
		<table>
			<tr>
				<td>
					<p><span>City Name</span> {location}</p>
				</td>
				<td>
					<p><span>Air Pressure</span> {airPressure}</p>
				</td>
				<td>
					<p><span>Date</span> {currentDate}</p>
				</td>
			</tr>
			<tr>
				<td>
					{' '}
					<p><span>Humidity</span> {humidity}</p>
				</td>
				<td>
					<p><span>Max Temp</span> {maxTemp}</p>
				</td>
				<td>
					<p><span>Min Temp</span> {minTemp}</p>
				</td>
			</tr>
			<tr>
				<td>
					<p><span>Predictability</span> {predictability}</p>
				</td>
				<td>
					<p><span>Weather Condition</span> {weatherState}</p>
				</td>
				<td>
					<p><span>Wind direction</span> {windDirection}</p>
				</td>
			</tr>
		</table>
	);

	const getWeatherByCity = (evt) => {
		evt.preventDefault();
		setLocation('');
		woeidInfo(city, (error, { longitude, latitude, location, woeid } = {}) => {
			if (error) {
				alert(error);
			} else {
				forecastWeather(longitude, latitude, woeid, (error, forecastdata) => {
					if (error) {
						alert(error);
					} else if (!forecastdata || forecastdata.length < 1) {
						alert('no data available');
					} else {
						setLocation(location);
						setAirPressure(forecastdata[0]['air_pressure']);
						setCurrentDate(forecastdata[0]['applicable_date']);
						setHumidity(forecastdata[0]['humidity']);
						setMaxTemp(forecastdata[0]['max_temp']);
						setMinTemp(forecastdata[0]['min_temp']);
						setPredictability(forecastdata[0]['predictability']);
						setWeatherState(forecastdata[0]['weather_state_name']);
						setWindDirection(forecastdata[0]['wind_direction_compass']);
					}
				});
			}
		});
	};

	return (
		<div>
			<h1>Weather App</h1>
			<form onSubmit={getWeatherByCity}>
				<label>
					City
					<input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
				</label>
				<button type="submit">Check Weather</button>
			</form>
			{location ? <Result /> : null}
		</div>
	);
}

export default App;
