const { Router } = require("express");

let express = require('express');
let router = express.Router();

const flightConteroller = require('../controller/flights');


/**
    * @swagger
    * /flightdata:
    *   post:
    *     tags:
    *       - Flight
    *     description: Flight Data
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: origin
    *         description: origin
    *         in: formData
    *         required: true
    *         type: string

    *       - name: destination
    *         description: destination
    *         in: formData
    *         required: true
    *         type: string
    
    *       - name: departDate
    *         description: departDate
    *         in: formData
    *         required: true
    *         type: string
    
    *       - name: returnDate
    *         description: returnDate
    *         in: formData
    *         type: string
    *     responses:
    *       200:
    *         description: Flight details found successfully    
    *       400:
    *         description: Flight details can not found    
    *       405:
    *         description: Invalid Request. Please try again.    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */

router.post('/flightdata', flightConteroller.sendAirlineData);

module.exports = router;