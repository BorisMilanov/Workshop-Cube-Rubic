const express = require('express')
const { engine } = require('express-handlebars');

function initHandlebars(app) {
    app.engine('hbs', engine({extname:'hbs'}));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}

module.exports = initHandlebars;