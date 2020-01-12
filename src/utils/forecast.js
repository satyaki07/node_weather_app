const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/c84ea7c1573ba27e688b9107bf0c0137/' + latitude + ',' + longitude + '?units=si';
	
	request({url, json: true}, (error, { body}) => {
		if (error) {
			callback('Unable to connect to the location service!', undefined);
		}
		else if (body.error) {
			callback('Unable to find location. Plase try another Search!', undefined);
		}
		else { 
			callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh}. The low today is ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% of rain.`);
		}
	})
}

module.exports = forecast

