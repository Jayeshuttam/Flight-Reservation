let User = require("../models/user");
var bodyParser = require('body-parser');
const { func } = require("prop-types");
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

exports.login = function (req, res, next) {
  let body = req.body;
  console.log(body)
  var responseData = { message: '', results: [], status: 0 }

  let email_input = body.email;
  let password = body.password;
  new Promise(function (resolve, reject) {
    _this = req;
    _that = res;

    User.authenticate(email_input, password, function (error, user) {
      if (error || !user) {
        responseData.message = 'Wrong email or password.';
        responseData.status = 401;
        reject(responseData);
      } else {
        responseData.result_data = user;
        responseData.first_name = user.first_name;
        responseData.last_name = user.last_Name;
        responseData.email = user.email;
        responseData.phone = user.phone;
        responseData.status = 1;
        responseData.message_body = "User has been logged in successfully";
        resolve(responseData)
      }
    });
  }).then((responseData) => {
    console.log("RESponse data=>", responseData);
    res.status(200).send(responseData);
  }).catch((err) => {
    res.status(400).send({
      "error": err
    });
  })

}

exports.signup = function (req, res) {
  let body = req.body;
  var responseData = {
    message: "user can not save",
    results: [],
    status: 0
  }
  let firstname = body.firstname;
  let lastname = body.lastname;
  let email = body.email;
  let password = body.password;
  let phone = body.phone;


  new Promise(function (resolve, reject) {

    var hash = crypto.createHash('md5').update(email).digest('hex');
    let userData = {
      'first_name': firstname,
      'last_Name': lastname,
      'phone': phone,
      'email': email,
      'password': password,
      'status': 0,
      'token': hash
    };
    User.create(userData, function (err, result) {
      if (err) {
        reject(err);

      }
      else {
        resolve(result);
      }
    });
  }).then((body) => {

    User.find({ 'email': body.email }, { _id: false, password: false }, function (err, result) {
      if (!err) {
        console.log("Incoming inputs => email =>", body.email);
        sendVerifyLink(body.email, body.token, 'Verify');
      }

      responseData.message = "user has been saved successfully";
      responseData.results = result;
      responseData.status = 1;
      res.send(responseData);
    });
  }).catch((err) => {
    responseData.message = err;
    res.send(responseData);
  })


}

let email = '';
exports.forgot = function (req, res) {
  email = req.body.email;
  action = "ChangePassword"
  sendResetLink(email, action);
}

exports.emailVerify = function (req, res) {
  let token = req.query.token;
  new Promise(function (resolve, reject) {
    User.findOne({ 'token': token, status: 0 }, function (err, result) {
      if (err) {
        reject(err)
      } else {
        if (result)
          resolve(result);
        else
          reject("Token has been expired");
      }


    });
  }).then((userData) => {
    User.updateOne({ '_id': userData._id }, { token: '', status: 1 }, function (err) {
      if (err)
        throw err;
      else
        res.send(userData);
    })
  }).catch(err => {
    res.send(err);
  })

}

exports.ChangePassword = function (req, res, next) {
  password = req.body.new_pass;

  var user = this;
  console.log(password, email);
  let hashed_password = '';
  new Promise(function (resolve, reject) {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return next(err);

      }
      hashed_password = hash;
      resolve(hashed_password);
      console.log(hashed_password);
      next();
    })

  }).then((hash) => {
    User.updateOne({ 'email': email }, { 'password': hash }, function (err) {
      if (err)
        throw err;
      else
        console.log("Password updated");
    })
  });

}



function sendResetLink(email, action) {
  var sender_email = 'jayeshuttam7844@gmail.com';
  var password = 'programmer@jayesh7844'
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
    subject: ' flight reservation system',
    text: ' Hii from flight reservation system That was easy!  here is the link to reset http://localhost:3000/' + action,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return console.log("Link sent to the Email");
}

function sendVerifyLink(email, token, action) {

  console.log("email=>", email);
  var sender_email = 'jayeshuttam7844@gmail.com';
  var password = 'programmer@jayesh7844'
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
    subject: ' flight reservation system',
    text: ' Hii from flight reservation system That was easy!  here is the link to verify http://localhost:3000/' + action + '?token=' + token,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return true;
    }
  });


}