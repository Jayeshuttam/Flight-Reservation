
const http = require("https");
const axios = require('axios').default;
var query = require('querystring');
var url = require('url');
var bodyParser = require('body-parser');
exports.sendAirlineData = function (req, res) {
    let body = req.body;
    let origin = body.origin;
    let destination = body.destination;
    let date = body.date;
    console.log("Body=>", body);
    let inbound_date = body.round_date;
    if (inbound_date == null || inbound_date == '') {
        inbound_date = "";
    }
    else {
        inbound_date = "?inboundpartialdate=" + inbound_date;
    }
    const options = {
        method: "GET",
        url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/referral/v1.0/US/USD/en-US/" + origin + "/" + destination + "/" + date + inbound_date,//"?shortapikey=ra66933236979928&apiKey=%7Bshortapikey%7D"
        headers: {
            "x-rapidapi-key": "bd95b32b6dmshe73b6921bc5bee6p1fb1eejsnefbe85da36ae",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "useQueryString": true
        }
    };
    axios.request(options).then(function (response) {
        console.log("Response data : " + response.data);
    }).catch(function (error) {

        console.log("Error");
        console.error(error);
    });
}

