const express = require('express');
const path = require('path');
const app = express();
var url=require('url');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
require('./mongo_db');

var userRouter=require('./routes/userRouter');
const session = require('express-session');


app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',userRouter);
app.use(session({
    secret:'work hard',
    resave:true,
    saveUninitialized:false
}));

app.get('/ping', function (req, res) {
 return res.send('pong');
});




app.listen(process.env.PORT || 8080);