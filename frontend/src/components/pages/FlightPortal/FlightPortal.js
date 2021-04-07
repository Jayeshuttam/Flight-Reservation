import React, { Component } from 'react'
import "../FlightPortal/style.css";
import background from '../bookFlight/images/background.jpg';

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

    pay = (amount) => {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_51IbuXaDG3xecOuBWO770WPwjg7w7YGqKh23sQOg0dZxqGpUTztn9gmKVVi9oZTAOjEsBxnt2FfVOeYhpsiHJqAhN00JPZ6n9ya',
            locale: 'auto',
            token: function (token) {
                console.log(token)
                alert('Token Created!!' + token.id);
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
                                                        <button onClick={() => this.pay(flight.price)} className="btn btn-info btn-block ButtonBookNow">Book Now ${flight.price}</button>
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
