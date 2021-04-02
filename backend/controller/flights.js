//const TravelPayouts = require('travelpayouts-api');
//const api = new TravelPayouts('76c613d1674a8dd11c39edb30e7a2d96', '316227');
let FlightBooking = require("../models/flight");
const http = require("https");
const axios = require('axios').default;
var query = require('querystring');
var url = require('url');
var bodyParser = require('body-parser');
exports.sendAirlineData = function (req, responseData) {
    let body = req.body;
    console.log("body=>", body);
    let origin = body.origin;
    let destination = body.destination;
    let departDate = body.departDate;
    let returnDate = body.returnDate;

    let apiUrl = "http://api.travelpayouts.com/v1/prices/cheap?origin=" + origin + "&destination=" + destination + "&depart_date=" + departDate + "&currency=USD";
    if (returnDate != undefined && returnDate != "") {
        apiUrl += "&return_date=" + returnDate;
    }
    apiUrl += "&token=76c613d1674a8dd11c39edb30e7a2d96";

    const options = {
        method: "GET",
        url: apiUrl
    };
    axios.request(options).then(function (response) {
        console.log(response.data)
        responseData.status(200).send(response.data);
    }).catch(function (error) {

        console.log("Error");
        console.error(error);
    });

}
exports.bookFlight = function (req, res) {
    let body = req.body;
    let userId = body.userId;
    let origin = body.origin;
    let destination = body.destination;
    let price = body.price;
    let adults = body.adults;
    let children = body.children;
    let flightClass = body.flightClass;
    let tripType = body.tripType;
    let departDate = body.departDate;
    let returnDate = body.returnDate;

    var responseData = { message: '', results: [], status: 0 }

    let flightBookingData = {
        'userId': userId,
        'origin': origin,
        'destination': destination,
        'price': price,
        'adults': adults,
        'children': children,
        'flightClass': flightClass,
        'tripType': tripType,
        'departDate': departDate,
        'returnDate': returnDate
    };
    new Promise(function (resolve, reject) {
        FlightBooking.create(flightBookingData, function (err, result) {
            if (err) {
                responseData.message = 'Flight can not book. Please try again.';
                responseData.status = 401;
                responseData.results = err;
                reject(responseData);
            }
            else {
                responseData.message = 'Flight has been booked successfully.';
                responseData.status = 200;
                responseData.results = result;
                resolve(result);
            }
        })
    }).then((responseData) => {
        res.status(200).send(responseData);

    }).catch((err) => {
        res.status(400).send(err);
    })
}

exports.getMyBookings = function (req, res) {
    let body = req.body;
    let userId = body.userId;
    var responseData = { message: '', results: [], status: 0 }
    new Promise(function (resolve, reject) {
        FlightBooking.find({ userId: userId }, function (err, result) {
            if (err) {
                responseData.message = 'No flight has been found. Please try again.';
                responseData.status = 401;
                responseData.results = err;
                reject(responseData);
            }
            else {
                responseData.message = 'All flights have been found successfully.';
                responseData.status = 200;
                responseData.results = result;
                resolve(responseData);
            }
        })
    }).then((responseData) => {
        res.status(200).send(responseData);

    }).catch((err) => {
        res.status(400).send(err);
    })
}

