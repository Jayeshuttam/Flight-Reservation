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

    componentDidMount() {
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

    render() {
        return (
            <section class="ftco-section" style={{ backgroundImage: `url(${background})` }}>
                <div class="container">
                    <div class="row justify-content-center">
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="h5 mb-4 text-center">Flights</h3>
                            <div class="table-wrap" style={{ marginLeft: 0 }}>
                                <table class="table">
                                    <thead class="thead-primary">
                                        <tr>
                                            <th>Departing From</th>
                                            <th>Departing To</th>
                                            <th>Departing Date</th>
                                            <th>Returning Date</th>
                                            <th>Adults</th>
                                            <th>Childrens</th>
                                            <th>Travel Class</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.flightData.map((flight, index) => (

                                                <tr class="alert" role="alert">
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
                                                    <td>{flight.departDate ? flight.departDate : "-"}</td>
                                                    <td>{flight.returnDate ? flight.returnDate : "-"}</td>

                                                    <td>{flight.adults}</td>
                                                    <td>{flight.children ? flight.children : "-"}</td>
                                                    <td>
                                                        {this.capitalize(flight.tripType)}
                                                    </td>
                                                    <td>${flight.price}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
