let User = require("../models/user");
var bodyParser = require('body-parser');
const { func } = require("prop-types");
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

exports.login = function (req, res, next) {
  let body = '';
  new Promise(function (resolve, reject) {
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
      resolve(JSON.parse(body))
    });
    /*req.on('end', () => {
      resolve(JSON.parse(body))
    });*/

  }).then(function (body) {

    let email_input = body.email;
    let password = body.password;
    console.log("Incoming inputs => email =>", email_input, " Password => ", password);
    new Promise(function (resolve, reject) {
      _this = req;
      _that = res;

      User.authenticate(email_input, password, function (error, user) {
        if (error || !user) {
          console.log("error=>", error);
          var err = new Error('Wrong email or password.');
          err.status = 401;
          reject(err);
        } else {
          resolve(user)
        }
      });
    }).then((user) => {
      console.log("then=>", user)
      res.send(user);
    }).catch((err) => {
      console.log("error=>", err)
      res.send(err);
      res.end("error");
    })
  }).catch((e) => {
    res.send("error");
    res.end("error");
  })
}


exports.signup = function (req, res) {
  var payload = {
    message: "user can not save",
    results: {},
    code: 400
  }
  let body = '';
  new Promise(function (resolve, reject) {
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      console.log("bodyData=>", JSON.parse(body).phone);
      //res.end('ok');
      resolve(JSON.parse(body))
    });

  }).then(function (body) {

    let first_name = body.first_name;
    let last_Name = body.last_name;
    let email = body.email;
    let password = body.password;
    let phone = body.phone;

    new Promise(function (resolve, reject) {

      var hash = crypto.createHash('md5').update(email).digest('hex');
      console.log(hash); // 9b74c9897bac770ffc029102a200c5de

      User.create({
        'first_name': first_name,
        'last_Name': last_Name,
        'phone': phone,
        'email': email,
        'password': password,
        'status': 0,
        'token': hash
      },
        function (err, result) {
          if (err) reject(err);
          else resolve(res);
        }
      );
    }).then((response) => {

      User.find({ 'email': email }, { _id: false, password: false }, function (err, result) {
        if (err) {
          throw err;
        }

        // try to send payload
        payload.message = "user has been saved successfully";
        payload.results = result;
        payload.code = 200;
        res.send(result);
        //console.log("Find=>",result);
        //response.redirect('/Login');
      });
    })

  });

}
let email = '';
exports.forgot = function (req, res) {
  email = req.body.email;
  sendResetLink(email);
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



function sendResetLink(email) {
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
    text: ' Hii from flight reservation system That was easy!  here is the link to reset http://localhost:3000/ChangePassword:'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}