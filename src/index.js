const express = require('express');
const path = require('path');
const routes = require('./routes');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDatabase = require('./config/database');
const cookieParser = require('cookie-parser');
const {auth} = require('./middlewares/authMiddleware');
const app = express();

app.use(auth); //See if it is buggy
require('./config/handlebars')(app);
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.resolve(__dirname, './public')));
app.use(cookieParser())
app.use(routes);

initDatabase(config.DB_CONNECTION_STRING).then(() => {
    app.listen(config.PORT, console.log.bind(console, `Application is running on http://localhost:${config.PORT}`));
}).catch(error => {console.log('Application init failed : ',error)})