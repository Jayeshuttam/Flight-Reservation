
var mongoose = require("../mongo_db");
const User = require("./user");

var Schema = mongoose.Schema;

var flight_booking_schema = new Schema({
    userId: {
        type: String,
        required: true,
        reference: { type: mongoose.Schema.ObjectId, ref: User }
    },
    payemntId: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    adults: {
        type: Number,
        default: 1
    },
    children: {
        type: Number
    },
    flightClass: {
        type: String,
        required: true
    },
    tripType: {
        type: String,
        required: true
    },
    departDate: {
        type: String,
        required: true
    },
    returnDate: {
        type: String,
    }
})
var FlightBooking = mongoose.model("FlightBooking", flight_booking_schema);
module.exports = FlightBooking;
