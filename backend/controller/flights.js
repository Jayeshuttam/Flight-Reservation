//const TravelPayouts = require('travelpayouts-api');
//const api = new TravelPayouts('76c613d1674a8dd11c39edb30e7a2d96', '316227');

const http = require("https");
const axios = require('axios').default;
var query = require('querystring');
var url = require('url');
var bodyParser = require('body-parser');
exports.sendAirlineData = function (req, responseData) {
    let body = req.body;
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

    /*
        return api.search({
            origin: origin,
            destination: destination,
            date: new Date(),
            currency: 'USD'
        })
            .then(res => {
                // console.log(res.results);
                responseData.status(200).send(res.results);
            })
            .catch(err => {
                console.error(err.stack || err.message);
                responseData.status(400).send(err.stack || err.message);
            });
            */
}

