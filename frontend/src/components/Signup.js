import React, { Component } from "react";
import './css/SignUp.css';
import { Redirect, Switch } from 'react-router-dom';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: ''
        };

        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    create(e) {
        // add entity - POST
        e.preventDefault();


        var details = {
            firstname: this.state.first_name,
            lastname: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        // creates entity
        fetch("http://localhost:8080/users/signup_verify", {
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json"
            },
            method: 'POST',
            mode: 'no-cors',
            body: formBody
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
            return <Redirect to='/Verify' />;
        }
        return (
            <div id="login-box">
                <div class="left">
                    <h1>Sign up</h1>
                    <form action="/users/signup_verify" method="POST">
                        <input type="text" name="first_name" placeholder="First Name"
                            value={this.state.first_name}
                            onChange={(e) => this.handleChange({ first_name: e.target.value })}
                        />
                        <input type="text" name="last_name" placeholder="Last Name"
                            value={this.state.last_name}
                            onChange={(e) => this.handleChange({ last_name: e.target.value })} />
                        <input type="text" name="email" placeholder="E-mail"
                            value={this.state.email}
                            onChange={(e) => this.handleChange({ email: e.target.value })} />
                        <input type="text" name="phone" placeholder="Phone"
                            value={this.state.phone}
                            onChange={(e) => this.handleChange({ phone: e.target.value })} />
                        <input type="password" name="Password" placeholder="Password"

                            value={this.state.password}
                            onChange={(e) => this.handleChange({ password: e.target.value })} />


                        <input type="submit" name="signup_submit" value="Sign up" onClick={(e) => this.create(e)} /><br />
                        <a href="/ResetPassword">Forget Password?</a>
                    </form>
                </div>

            </div>


        );
    }
}