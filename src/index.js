const express = require('express');
const path = require('path')
const routes = require('./routes');
const app = express();
require('./config/handlebars')(app);
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, './public')))

app.use(routes)
app.listen(3000);