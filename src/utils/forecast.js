const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/c84ea7c1573ba27e688b9107bf0c0137/' + latitude + ',' + longitude + '?units=si';
	
	request({url, json: true}, (error, response) => {
		if (error) {
			callback('Unable to connect to the location service!', undefined);
		}
		else if (response.body.error) {
			callback('Unable to find location. Plase try another Search!', undefined);
		}
		else {
			callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% of rain.`);
		}
	})
}

module.exports = forecast

