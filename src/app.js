const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();

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


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Home Page',
        message: 'The Ledger Nano X is a Bluetooth® enabled secure device that stores your private keys. Make sure all your crypto assets are safe, wherever you go.',
        name: 'Samson'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About Page",
        message: 'device that stores your private keys. Make sure all your crypto assets',
        name: 'Samson'
    });
});

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        message: 'The Ledger Nano X is a Bluetooth® enabled secure device',
        name: 'Samson'
    });
});

//404 page always comes last behind all over Route handlers.
app.get('/help/*', (req, res)=>{
    res.render('page404', {
        title: '404 Page',
        message: 'Sorry please select another message from the help section'
    });
});

app.get('*', (req, res)=>{
    res.render('page404',{
        message: "Sorry no page found",
        name: 'Samson'
    });
});

app.listen(3000, console.log('server is listening'));