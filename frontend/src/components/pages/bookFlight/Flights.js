import React, { Component } from 'react';
import './style.css';

import background from '../bookFlight/images/background.jpg';


export default class Flights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            flightType: '',
            departureDate: '',
            returnDate: '',
            numberOfAdults: '',
            numberOfChildren: '',
            travelClass: '',
            flightData: ''
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
                console.log(flightData)
                listOfFlights += "<tr>";
                for (var item in flightData) {
                    console.log(flightData[item])
                    var flights = flightData[item];
                    for (var data in flights) {
                        console.log("DD=>", flights[data])
                        listOfFlights += `
                        <td>`+ flights[data].airline + `</td>
                        <td>`+ this.state.origin + `</td>
                        <td>`+ this.state.destination + `</td>
                        <td>$`+ flights[data].price + `</td>
                        `;
                    }
                }
                listOfFlights += "</tr>";
                this.state.flightData = listOfFlights;
                // flightData.forEach(function (entry) {
                //     console.log(entry);
                // });
                if (result.status == 1) {
                    this.setState({ redirect: true })
                }
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
            // return <Redirect to='/Verify' />;
        }
        return (
            <div id="booking" className="section" style={{ backgroundImage: `url(${background})` }}>
                <div className="section-center">
                    <div className="container">
                        <div className="row">
                            <div className="booking-form">
                                <form>
                                    <div className="form-group">
                                        <div className="form-checkbox">
                                            <label htmlFor="roundtrip">
                                                <input type="radio" id="roundtrip" name="flightType" />
                                                <span></span>Roundtrip
                                        </label>
                                            <label htmlFor="one-way">
                                                <input type="radio" id="one-way" name="flightType" />
                                                <span></span>One way
                                        </label>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <span className="form-label">Flying from</span>
                                                <input className="form-control" type="text" placeholder="City or airport"
                                                    value={this.state.origin}
                                                    onChange={(e) => this.handleChange({ origin: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <span className="form-label">Flyning to</span>
                                                <input className="form-control" type="text" placeholder="City or airport"
                                                    value={this.state.destination}
                                                    onChange={(e) => this.handleChange({ destination: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <span className="form-label">Departing</span>
                                                <input className="form-control" type="date" required
                                                    value={this.state.departureDate}
                                                    onChange={(e) => this.handleChange({ departureDate: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ display: 'none' }} className="col-md-3">
                                            <div className="form-group">
                                                <span className="form-label">Returning</span>
                                                <input className="form-control" type="date" required
                                                    value={this.state.returnDate}
                                                    onChange={(e) => this.handleChange({ returnDate: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <span className="form-label">Adults (18+)</span>
                                                <select className="form-control"
                                                    value={this.state.numberOfAdults}
                                                    onChange={(e) => this.handleChange({ numberOfAdults: e.target.value })}
                                                >
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </select>
                                                <span className="select-arrow"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <span className="form-label">Children (0-17)</span>
                                                <select className="form-control"
                                                    value={this.state.numberOfChildren}
                                                    onChange={(e) => this.handleChange({ numberOfChildren: e.target.value })}
                                                >
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                </select>
                                                <span className="select-arrow"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <span className="form-label">Travel class</span>
                                                <select className="form-control"
                                                    value={this.state.travelClass}
                                                    onChange={(e) => this.handleChange({ travelClass: e.target.value })}
                                                >
                                                    <option>Economy class</option>
                                                    <option>Business class</option>
                                                    <option>First class</option>
                                                </select>
                                                <span className="select-arrow"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-btn">
                                                <button className="submit-btn" type="submit" onClick={(e) => this.create(e)}>Show flights</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 column">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Dep.</th>
                                <th>Arr.</th>
                                <th>Price</th>
                                <th>Dep. Time</th>
                            </tr>
                        </thead>
                        <tbody id="flights_info">{this.state.flightData}</tbody>
                    </table>
                </div>
            </div>




        )
    }
}
