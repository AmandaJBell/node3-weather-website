const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/11b5ddd7ebac08945a02f8bbd509ba15/' + latitude + ',' + longitude + '?units=si';
	request({ url, json: true }, (error, {body}) => {
		if (error) {
			callback('Unable to connect to weather services.', undefined)
		}
		else if (body.error) {
			callback('Unable to find location try another search', undefined)
		} else {
			const {daily, currently} = body
			callback(undefined, {
				summary: daily.data[0].summary,
				temperature: currently.temperature,
				precipProbability: currently.precipProbability
			})
		}
	})
}

module.exports = forecast