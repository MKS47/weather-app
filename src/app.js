const express = require('express')
const path = require('path')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('weather', {
        name: 'Maneesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Maneesh',
        title: 'Developer'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Maneesh',
        location: 'Permpilly, Mulanthruthy, kerala',
        phoneNo: '9591016781'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        errorMsg: 'Sorry resource doesn\'t exist',
        name: 'Maneesh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Enter an Address' });
    }

    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error: error });
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                res.send({ error: error });
            }
            res.send({ location: req.query.address, weatherReport: data.weatherStatus })

        })
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        errorMsg: 'Oops resource doesn\'t exist :(',
        name: 'Maneesh'
    })
})


app.listen(port, () => {
    console.log('Server listening at Port ' + port)
})