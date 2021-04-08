import React, { Component } from 'react'
import "../FlightPortal/style.css";
import background from '../bookFlight/images/background.jpg';
import { Redirect } from 'react-router-dom';

export default class FlightPortal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightData: []
        };

        this.handleChange = this.handleChange.bind(this);
    }


    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    handleChange(changeObject) {
        this.setState(changeObject)
    }

    pay = (amount, index) => {
        let _this = this;
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_51IbuXaDG3xecOuBWO770WPwjg7w7YGqKh23sQOg0dZxqGpUTztn9gmKVVi9oZTAOjEsBxnt2FfVOeYhpsiHJqAhN00JPZ6n9ya',
            locale: 'auto',
            token: function (token) {
                console.log(token)
                let uid = localStorage.getItem('userId');
                console.log("userId=>", uid)
                console.log("full Data=>", _this.state.flightData)
                console.log("index Data=>", _this.state.flightData[index])
                let flightDataObject = {
                    payemntId: token.id,
                    userId: uid,
                    origin: _this.state.flightData[index].origin,
                    destination: _this.state.flightData[index].destination,
                    price: _this.state.flightData[index].price,
                    tripType: _this.state.flightData[index].flightType,
                    departDate: _this.state.flightData[index].departure_at,
                    returnDate: _this.state.flightData[index].return_at,
                    adults: _this.state.flightData[index].numberOfAdults,
                    children: _this.state.flightData[index].numberOfChildren,
                    flightClass: _this.state.flightData[index].travelClass
                };
                console.log("flightDataObject====>", flightDataObject)

                var formBody = [];
                for (var property in flightDataObject) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(flightDataObject[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");


                // create an XHR object
                const xhr = new XMLHttpRequest();

                // listen for `onload` event
                xhr.onload = () => {
                    // process response
                    if (xhr.status == 200) {

                        _this.setState({ redirect: true })
                    } else {
                        console.error('Error!');
                    }
                };

                // set headers

                xhr.open('POST', 'http://localhost:8080/bookFlight');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                // send request
                xhr.send(formBody);

            }
        });

        handler.open({
            name: 'Flickr Flight Payment',
            description: 'Your flight is booked with just one click.',
            amount: amount * 100
        });
    }

    componentDidMount() {
        this.loadStripe();
        let flightData = JSON.parse(localStorage.getItem('flightData'));
        console.log("flightData=>", flightData)
        this.setState({ flightData: flightData })
    }

    loadStripe = () => {

        if (!window.document.getElementById('stripe-script')) {
            var s = window.document.createElement("script");
            s.id = "stripe-script";
            s.type = "text/javascript";
            s.src = "https://checkout.stripe.com/checkout.js";
            window.document.body.appendChild(s);
        }
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/My-Bookings' />;
        }
        return (
            <section class="ftco-section" style={{ backgroundImage: `url(${background})` }}>
                <div class="container">
                    <div class="row justify-content-center">
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-wrap" style={{ marginLeft: 0 }}>

                                <div class="table-wrap">
                                    <table class="table">
                                        <thead class="thead-primary">
                                            <tr>
                                                <th>Flight Number</th>
                                                <th>Flight Name</th>
                                                <th>Departing From</th>
                                                <th>Departing To</th>
                                                <th>Departing Date</th>
                                                <th>Returning Date</th>
                                                <th>Price</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.flightData.map((flight, index) => (

                                                    <tr class="alert" role="alert">
                                                        <td>{flight.flight_number}</td>
                                                        <td>{flight.airline.toUpperCase()}</td>
                                                        <td>
                                                            <div class="departingFrom">
                                                                <span>{flight.origin.toUpperCase()} </span>

                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="departingTo">
                                                                <span>{flight.destination.toUpperCase()}</span>

                                                            </div>
                                                        </td>
                                                        <td>{flight.departure_at ? flight.departure_at : "-"}</td>
                                                        <td>{flight.return_at ? flight.return_at : "-"}</td>

                                                        <td>${flight.price}</td>
                                                        <td>
                                                            <button onClick={() => this.pay(flight.price, index)} className="btn btn-info btn-block ButtonBookNow">Book Now ${flight.price}</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        )
    }
}
