import React, { Component } from 'react';
import './style.css';
import { Redirect } from 'react-router-dom';

import background from '../bookFlight/images/background.jpg';


export default class Flights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            flightType: 'one-way',
            departureDate: '',
            returnDate: '',
            numberOfAdults: 1,
            numberOfChildren: 0,
            travelClass: 'Economy',
            flightData: '',
            tripType: 'false'
        };

        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }


    create(e) {
        e.preventDefault();

        let flightDataObject = {
            origin: this.state.origin,
            destination: this.state.destination,
            flightType: this.state.flightType,
            departDate: this.state.departureDate,
            returnDate: this.state.returnDate,
            numberOfAdults: this.state.numberOfAdults,
            numberOfChildren: this.state.numberOfChildren,
            travelClass: this.state.travelClass
        };

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
            var listOfFlights = "";
            if (xhr.status == 200) {
                // parse JSON data
                var result = JSON.parse(xhr.response);
                var flightData = result.data;
                var updatedFlightData = [];
                for (var item in flightData) {
                    var flights = flightData[item];
                    for (var data in flights) {

                        flights[data].origin = this.state.origin;
                        flights[data].destination = this.state.destination;
                        var departure_at = new Date(flights[data].departure_at)
                        var pstDepartureAt = departure_at.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
                        flights[data].departure_at = pstDepartureAt;

                        var return_at = new Date(flights[data].return_at)
                        var pstReturnAt = return_at.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
                        flights[data].return_at = pstReturnAt;
                        flights[data].flightType = this.state.flightType;
                        flights[data].numberOfAdults = this.state.numberOfAdults;
                        flights[data].numberOfChildren = this.state.numberOfChildren;
                        flights[data].travelClass = this.state.travelClass;
                        flights[data].price = (parseInt(this.state.numberOfAdults) * parseInt(flights[data].price)) + (this.state.numberOfChildren * (flights[data].price / 2));
                        updatedFlightData.push(flights[data])
                    }
                }

                localStorage.setItem('flightData', JSON.stringify(updatedFlightData))
                this.setState({ redirect: true })
            } else {
                console.error('Error!');
            }
        };

        // set headers

        xhr.open('POST', 'http://localhost:8080/flightdata');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // send request
        xhr.send(formBody);
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/Flight-Portal' />;
        }
        return (


            <div id="booking" class="section" style={{ backgroundImage: `url(${background})` }}>
                <div class="section-center">
                    <div class="container">
                        <div class="row">
                            <div class="booking-form">
                                <form>
                                    <div class="form-group">
                                        <div class="form-checkbox">
                                            <label for="roundtrip" >
                                                <input type="radio" value={this.state.tripType} onChange={(e) => this.handleChange({ tripType: false })} id="roundtrip" name="flight-type" required />
                                                <span></span>Roundtrip
									</label>
                                            <label for="one-way">
                                                <input type="radio" checked="checked" value={this.state.tripType} onChange={(e) => this.handleChange({ tripType: true })} id="one-way" name="flight-type" required />
                                                <span></span>One way
									</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="form-label">Flying from</span>
                                                <input class="form-control" type="text" placeholder="City or airport"
                                                    value={this.state.origin}
                                                    onChange={(e) => this.handleChange({ origin: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <span class="form-label">Flyning to</span>
                                                <input class="form-control" type="text" placeholder="City or airport"
                                                    value={this.state.destination}
                                                    onChange={(e) => this.handleChange({ destination: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <span class="form-label">Departing</span>
                                                <input class="form-control" type="date" required
                                                    value={this.state.departureDate}
                                                    onChange={(e) => this.handleChange({ departureDate: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div id={this.state.tripType ? 'returnFlight' : ''} class="col-md-3">
                                            <div class="form-group">
                                                <span class="form-label">Returning</span>
                                                <input class="form-control" type="date" required
                                                    value={this.state.returnDate}
                                                    onChange={(e) => this.handleChange({ returnDate: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div id="Adults" class="col-md-2">
                                            <div class="form-group">
                                                <span class="form-label">Adults (18+)</span>
                                                <select id="slc1" class="form-control"
                                                    value={this.state.numberOfAdults}
                                                    onChange={(e) => this.handleChange({ numberOfAdults: e.target.value })}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>

                                            </div>
                                        </div>
                                        <div id="children" class="col-md-2">
                                            <div class="form-group">
                                                <span class="form-label">Children (0-17)</span>
                                                <select id="slc2" class="form-control"
                                                    value={this.state.numberOfChildren}
                                                    onChange={(e) => this.handleChange({ numberOfChildren: e.target.value })}
                                                >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <span class="form-label">Travel class</span>
                                                <select class="form-control"
                                                    value={this.state.travelClass}
                                                    onChange={(e) => this.handleChange({ travelClass: e.target.value })}
                                                >
                                                    <option value="Economy">Economy class</option>
                                                    <option value="Business">Business class</option>
                                                    <option value="First">First class</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-btn">
                                                <button id="submit-btn11" type="submit" onClick={(e) => this.create(e)} class="submit-btn">Show flights</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>


            </div>




        )
    }
}
