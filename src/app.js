const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express()

//Define paths
const publicDirectoriesPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoriesPath))


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Amanda Bell'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Amanda Bell'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		res.send({
			error: "You must provide and address"
		})
	} else {
		geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
			if (error) {
				res.send({
					error
				})
			} 
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					res.send({
						error
					})
				} else {
					const {summary, temperature, precipProbability} = forecastData;
					const forecastSentence = (summary +' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain.');
					res.send({
						location,
						forecast: forecastSentence,
						address: req.query.address,
					})
				}
			})
		})
	}
})

app.get('/products', (req, res) => {
	if (!req.query.search){
		res.send({
			error: "You must provide search erm"
		})
	} else {
	console.log(req.query.search)
	res.send({
		products: []
	})
}
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Amanda Bell',
		message: 'Welcome to the help page.'
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Not Found',
		name: 'Amanda Bell',
		message: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Not Found',
		name: 'Amanda Bell',
		message: 'Article not found'
	})
})


app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})