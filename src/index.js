const express = require('express');
const path = require('path')
const app = express();
require('./config/handlebars')(app);




app.use(express.static(path.resolve(__dirname,'./public')))
app.get('/', function (req, res) {
    res.render('index');
});
app.listen(3000);