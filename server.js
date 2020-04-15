const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const path = require('path');

const app = express();
const key = '04eb4a881b881c2491f70f944452b62d';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes(app);

app.listen(3001,()=>{console.log('Listening on port 3001!')});

module.exports = app;
