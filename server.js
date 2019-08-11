const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./src/utils/logger');

// configs
require('dotenv').config();
// require('./src/utils/database');


// init express
const app = express();

// parse application/x-www-form-urlencoded & application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2mb' }));

// use routes
app.use('/api/user', require('./src/routes/user'));
app.use('/api/posts', require('./src/routes/posts'));

// use static
app.use(express.static(path.resolve(__dirname, '../public')));

// handle 404 (user errors)
app.use((req, res, next) => {
    res.status(404).send(`<h2>Oops 404</h2> <h3>We think you are lost!</h3>`);
});

// start listening
app.listen(process.env.PORT, () => logger.info(`app started on ${process.env.PORT}`) );
