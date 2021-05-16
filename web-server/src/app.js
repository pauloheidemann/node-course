const path = require('path')
const express = require("express");
const hbs = require("hbs");
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Paulo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Paulo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Paulo'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        res.send('Provide a valid address')
        return 
    }
    geoCode(address, (response) => {
        forecast(response)
    })
    res.send('Weather page')
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article not found',
        name: 'Paulo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Page not found',
        name: 'Paulo'
    })
})

app.listen(3000, () => {
    console.log('App started on port 3000')
})