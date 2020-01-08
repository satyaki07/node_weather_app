const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express()

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');




//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	
	res.render('index', {
		title: 'Weather App',
		name: 'Satyaki Bose'
	});
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Satyaki Bose'
	})
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',	
		message: 'AAj kal chodne ko help karna bolte hai!!',
		name: 'Satyaki Bose'
	})
})
app.get('/weather', (req,res) => {
	
	if (!req.query.address) {
		return res.send({
			error: 'You need to provide an address'
		})
	}
	
	geoCode(req.query.address, (error, {latitude, longitude, location }=  {}) => {
		if (error) {
			return res.send({ error});
		}
		
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({error});
			}
			
			res.send({
				forecast: forecastData, 
				location,
				address: req.query.address
			})
		})
	})
	// console.log(req.query.address);
	// res.send({
	// 	address: req.query.address
	// })
});

app.get('/product', (req, res) => {
	
	if (!req.query.search) {
		return res.send({
			error: 'You need to provide a sarch term.'
		})
	}
	
	console.log(req.query.search);
	res.send({
		products: []
	})
})

app.get('/help/*', (req,res) => {
	res.render('404', {
		title: '404',
		name: 'Satyaki Bose', 
		errorMessage: 'Help Article Not Found!!'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Satyaki Bose',
		errorMessage: 'Page not found!'
	})
})
		

app.listen(3000, () => {
	console.log("Server is up on port 3000");
})