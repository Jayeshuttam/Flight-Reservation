const { Router } = require("express");

let express=require('express');
let router= express.Router();
let userConteroller=require("../controller/users");
router.post("/users/signup_verify",userConteroller.signup);
router.post("/users/login_verify",userConteroller.login);
router.post("/forgot",userConteroller.forgot);
router.post('/changepassword',userConteroller.ChangePassword);


module.exports= router;