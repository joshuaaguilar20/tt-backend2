const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;

// Will connect to DB "tt-be-db-test" in test/test_helper.js
// if expression is false
if(process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/tt-be-db');    
}

app.use(bodyParser.json());
routes(app);

module.exports = app;
