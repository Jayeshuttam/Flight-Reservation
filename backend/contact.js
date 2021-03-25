const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
var url = require('url');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post("/ContactUs",(req,res)=>{
    const message=req.body.message;
    const name=req.body.name;
    const email=req.body.email;
    console.log(message,name,email);

    var sender_email = 'manjit7898@gmail.com';
    var password = 'manjit1711'
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender_email,
        pass: password
      }
    });
    
    var mailOptions = {
      from: sender_email,
      to: email,
      subject: 'Contact flight',
      text: '<b>'+{name}+'</b>'
      
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return true;
      }
    });
  

})

app.listen(8080,()=>{
    console.log("server running")
});