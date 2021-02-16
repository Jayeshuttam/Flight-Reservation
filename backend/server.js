const express = require('express');
const path = require('path');
const app = express();
var url=require('url');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/ping', function (req, res) {
 return res.send('pong');
});

require('./mongo_db');
require('./models/users');


var email;
//checks for the email in the database
app.post('/forgot',function(req,res){
 email=req.body.email;
  console.log("Email=>",email);
sql.checkUser(email).then((result)=>{
  if(result)
  {
    res.send("User found reset link sent to email");
    sendResetLink(email);
  }
  else
  {
    res.send("user not found");
  }
  res.end();
})
});
//sends reset link to the client mail f
function sendResetLink(email)
{
  var sender_email='jayeshuttam7844@gmail.com';
  var password='programmer@jayesh7844'
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:sender_email ,
      pass: password
    }
  });
  
  var mailOptions = {
    from:sender_email ,
    to: email,
    subject: ' flight reservation system',
    text: ' Hii from flight reservation system That was easy!  here is the link to reset http://localhost:3000/ChangePassword'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


app.listen(process.env.PORT || 8080);