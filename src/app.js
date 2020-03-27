const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Defines Paths for Express
const staticPath = path.join(__dirname, '../public/');
const hbsViews = path.join(__dirname, '../templates/views');
const hbsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', hbsViews);
hbs.registerPartials(hbsPath);

//Setup static directory
app.use(express.static(staticPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        message: 'Welcome to your local weather finder',
        name: 'Samson'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        message: 'Simple weather web app',
        name: 'Samson'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Please contact sltdev@protonmail.com if you have any questions',
        name: 'Samson'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
         res.send({
            error: 'Please enter a valid address'
        });
    } else {
        geoCode(req.query.search, (err, data = {}) => {
            if(err){
                return res.send({
                    error: err
                });
            }
            foreCast(data.long, data.lat, data.destination, (err, forecastData = {}) => {
                if(err){
                    return res.send({
                        error: err
                    });
                }
                res.send({
                    destination: forecastData.destination,
                    temp: forecastData.temp,
                    summary: forecastData.dailySummary
                })
            });
            
            
            
            

        });
    }
});

//404 page always comes last behind all over Route handlers.
app.get('/help/*', (req, res) => {
    res.render('page404', {
        title: '404 Page',
        message: 'Sorry please select another message from the help section'
    });
});

app.get('*', (req, res) => {
    res.render('page404', {
        message: "Sorry no page found",
        name: 'Samson'
    });
});

app.listen(port, ()=>{
    console.log(`server is listening on port:${port}`);});