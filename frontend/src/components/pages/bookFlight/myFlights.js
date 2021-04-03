import React, { Component } from 'react';
import './style.css';

import background from '../bookFlight/images/background.jpg';


export default class MYFlights extends Component {

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
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                console.log(token)
                alert('Token Created!!' + token.id);
            }
        });

        handler.open({
            name: 'Demo Site',
            description: '2 widgets',
            amount: amount * 100
        });
    }

    componentDidMount() {
        this.loadStripe();
        let uid = localStorage.getItem('userId');
        console.log("userId=>", uid)
        let getFlightDataObject = {
            userId: uid
        };

        var formBody = [];
        for (var property in getFlightDataObject) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(getFlightDataObject[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        console.log("formBody=>", formBody)

        // create an XHR object
        const xhr = new XMLHttpRequest();

        // listen for `onload` event
        xhr.onload = () => {
            // process response
            var listOfFlights = "";
            console.log("xhr=>", xhr)
            if (xhr.status == 200) {
                // parse JSON data
                var result = JSON.parse(xhr.response);
                var flightData = result.results;
                console.log(flightData)
                this.setState({ flightData: flightData })

            } else {
                console.error('Error!');
            }
        };

        // set headers

        xhr.open('POST', 'http://localhost:8080/myFlights');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // send request
        xhr.send(formBody);
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
            <div id="booking" className="section" style={{ backgroundImage: `url(${background})` }}>
                <table className="table table-bordered">
                    <tr>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Flight Class</th>
                        <th>Trip Type</th>
                        <th>Price</th>
                    </tr>
                    {
                        this.state.flightData.map((flight, index) => (
                            <tr data-index={index}>
                                <td>{this.capitalize(flight.origin)}</td>
                                <td>{this.capitalize(flight.destination)}</td>
                                <td>{flight.adults}</td>
                                <td>{flight.children}</td>
                                <td>{this.capitalize(flight.flightClass)}</td>
                                <td>{this.capitalize(flight.tripType)}</td>
                                <td>${flight.price}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }
}
