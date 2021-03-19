import React, { Component } from 'react';

export default class Flight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            date: '',
            round_date: ''
        };
        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }
    create(e) {
        e.preventDefault();
        var details = {
            'origin': this.state.origin,
            'destination': this.state.destination,
            'date': this.state.date,
            'round_date': this.state.round_date
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        // creates entity
        fetch("http://localhost:8080/flightdata", {
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json"
            },
            "mode": 'no-cors',
            "body": formBody
        })
            .then(resp => resp.JSON()).then(console.log)
            .catch(err => {
                console.log(err)
            });
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    render() {
        return (<div>
            <input type="text" name="origin" onChange={(e) => this.handleChange({ origin: e.target.value })} value={this.state.origin} />
            <input type="text" name="destination" onChange={(e) => this.handleChange({ destination: e.target.value })} value={this.state.destination} />
            <input type="date" name="date" onChange={(e) => this.handleChange({ date: e.target.value })} value={this.state.date} />
            <input type="date" name="round_date" onChange={(e) => this.handleChange({ round_date: e.target.value })} value={this.state.round_date} />
            <input type="submit" name="search_flights" value="Find" onClick={(e) => this.create(e)} />
        </div>);



    }
}

