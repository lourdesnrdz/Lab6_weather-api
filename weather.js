
const credentials = require('./credentials.js')

const request = require('request')

const forecast = function (longitude, latitude, callback) {
	const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitude + ',' + longitude + '?&units=si'

	request({url, json:true}, function(error, response) {

		if (error){
			callback("ERROR", null)
		} else {
			const data = response.body

			if (data.error) {
				callback(data.error, null)
			}
			else {

				const info = {
					timezone: data.timezone,
					summary: data.currently.summary,
					precipProbability: data.currently.precipProbability * 100 + '%',
					humidity: data.currently.humidity * 100 + '%',
					hourly: data.hourly.summary,
					daily: data.daily.summary,
					temperature: data.currently.temperature
				}

				if (data.currently.precipProbability){
					info.precipType = data.currently.precipType
				} else {
					info.precipType = 'precipitation'
				}


				const weather = info.summary + '. The temperature today is ' + info.temperature + '°C, with ' + info.precipProbability + ' of ' + info.precipType + ', and humidity of ' + info.humidity + '. ' + info.hourly + ' ' + info.daily

				callback(null, weather)
			}		
		}
	})
}

const geocode = function(ciudad, callback) {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?access_token=' + credentials.MAPBOX_TOKEN
	
	request({url, json:true}, function(error, response) {
 
		if (error) {
			//si no hay response
			callback("ERROR", null)

		} else {

			const data = response.body

			if (data.message) {

				callback(data.message, null)

			} else if (data.features.length == 0) {

				callback("Incorrect Input", null)

			} else {

				const info = {
					place_name: data.features[0].place_name,
					longitude: data.features[0].center[0],
					latitude: data.features[0].center[1]
				}
				callback(null, info)
			}
		}
	})
}

module.exports = {
	forecast : forecast,
	geocode : geocode
}