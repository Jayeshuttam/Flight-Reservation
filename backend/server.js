const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors')



var url = require('url');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var swagger = require('./configs/swagger');
require('./mongo_db');

var userRouter = require('./routes/userRouter');
var flightRouter = require('./routes/flightRouter');
const session = require('express-session');

app.use(swagger);

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', flightRouter);
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/api/ping', function (req, res) {
    if (req.json({ "success": true })) {
        res.status(200);
    }
});

app.listen(process.env.PORT || 8080);