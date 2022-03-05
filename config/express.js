const express = require('express');
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

function setupExpress(app) {

    app.engine('hbs', handlebars({
        extname: 'hbs'
    }))
    app.set('view engine', "hbs");

    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use;
}

module.exports = setupExpress;