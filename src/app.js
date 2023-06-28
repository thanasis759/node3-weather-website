const path = require('path')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000
//Define paths for express config
const publicFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicFolder))

//Setup routers
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        someName: 'Athanasios'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        someName: 'Athanasios'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        someName: 'Athanasios'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide an address'})
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (forecastError, {temperature, feelslike, humidity} = {}) => {
            if (forecastError) {
                return res.send({error: forecastError})
            }
            res.send({
                location,
                temperature,
                feelslike,
                humidity
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        example: 'Help article not found',
        title: 'Error'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        example: 'Page not found',
        title: 'Error'
    })
})

app.listen(port, () => {
    console.log('Server started on ' + port)
})