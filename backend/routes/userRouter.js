const { Router } = require("express");

let express = require('express');
let router = express.Router();
let userConteroller = require("../controller/users");
let feedbackController=require("../controller/feedback");
/**
    * @swagger
    * /users/signup_verify:
    *   post:
    *     tags:
    *       - Users
    *     description: Add new user
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:

    *       - name: firstname
    *         description: Firstname
    *         in: formData
    *         required: true
    *         type: string

    *       - name: lastname
    *         description: Lastname
    *         in: formData
    *         required: true
    *         type: string

    *       - name: email
    *         description: Email
    *         in: formData
    *         required: true
    *         type: string

    *       - name: password
    *         description: password
    *         in: formData
    *         required: true
    *         type: string

    *       - name: phone
    *         description: Phone number
    *         in: formData
    *         required: true
    *         type: string
    
    *     responses:
    *       201:
    *         description: User created successfully    
    *       409:
    *         description: User already exists    
    *       405:
    *         description: Invalid Request. Please try again.    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */
router.post("/users/signup_verify", userConteroller.signup);


router.post("/api/form",feedbackController.feedback);
/**
    * @swagger
    * /users/login_verify:
    *   post:
    *     tags:
    *       - Users
    *     description: Login User
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: email
    *         description: Email
    *         in: formData
    *         required: true
    *         type: string

    *       - name: password
    *         description: password
    *         in: formData
    *         required: true
    *         type: string
    *     responses:
    *       201:
    *         description: User created successfully    
    *       409:
    *         description: User already exists    
    *       405:
    *         description: Invalid Request. Please try again.    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */
router.post("/users/login_verify", userConteroller.login);
router.post("/forgot", userConteroller.forgot);
router.post('/changepassword', userConteroller.ChangePassword);
router.post('/Verify', userConteroller.emailVerify)



/**
    * @swagger
    * /verify:
    *   get:
    *     tags:
    *       - Verify
    *     description: Verify user
    *     parameters:

    *       - name: token
    *         description: verify token
    *         in: query
    *         required: true
    *         type: string

    *     responses:
    *       200:
    *         description: User verified successfully    
    *       404:
    *         description: User not found    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */
router.get('/verify', userConteroller.emailVerify);


module.exports = router;