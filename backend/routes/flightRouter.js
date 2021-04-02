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



/**
    * @swagger
    * /bookFlight:
    *   post:
    *     tags:
    *       - Flight
    *     description: Save Flight Data
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: userId
    *         description: userId
    *         in: formData
    *         required: true
    *         type: string
        
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

    *       - name: price
    *         description: price
    *         in: formData
    *         required: true
    *         type: string

    *       - name: adults
    *         description: adults
    *         in: formData
    *         required: true
    *         type: string

    *       - name: children
    *         description: children
    *         in: formData
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
    
    *       - name: flightClass
    *         description: flightClass
    *         in: formData
    *         type: string
    *         required: true
    
    *       - name: tripType
    *         description: tripType
    *         in: formData
    *         type: string
    *         required: true
    *     responses:
    *       200:
    *         description: Flight has been booked successfully    
    *       400:
    *         description: Flight can not save    
    *       405:
    *         description: Invalid Request. Please try again.    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */

router.post('/bookFlight', flightConteroller.bookFlight);



/**
    * @swagger
    * /myFlights:
    *   post:
    *     tags:
    *       - Flight
    *     description: Get My Flights
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: userId
    *         description: userId
    *         in: formData
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: All flights have been found successfully.    
    *       400:
    *         description: No flight has been found. Please try again    
    *       405:
    *         description: Invalid Request. Please try again.    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */

router.post('/myFlights', flightConteroller.getMyBookings);


module.exports = router;