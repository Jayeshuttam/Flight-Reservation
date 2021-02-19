import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Verify extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            value: 'Not Verified'

        }
        const query = new URLSearchParams(this.props.location.search);
        this.token = query.get('token')


        this.handleChange = this.handleChange.bind(this);
        this.create();
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    create() {
        fetch("http://localhost:8080/verify?token=" + this.token, {
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            method: 'POST',
            mode: 'no-cors',

        })
            .then(response => {
                console.log(response);
                this.setState({ redirect: true })

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            window.location.href = "/Login";
        }
        return (
            <div>
                <input value={this.state.value} onChange={this.handleChange} />
                <h1>Verification Link has been send to your email.</h1>
            </div>);
    }
}
export default Verify;