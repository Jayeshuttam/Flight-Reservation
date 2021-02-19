import React, { Component } from "react";
import './css/SignUp.css';
import { Redirect, Switch } from 'react-router-dom';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
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
        // creates entity
        fetch("http://localhost:8080/users/signup_verify", {
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone
            })
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
            return <Redirect to='/Login' />;
        }
        return (
            <div id="login-box">
                <div class="left">
                    <h1>Sign up</h1>

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


                    <input type="submit" name="signup_submit" value="Sign up" onClick={(e) => this.create(e)} />
                </div>

                <div class="right">
                    <span class="loginwith">Sign in with<br />social network</span>

                    <button class="social-signin facebook">Log in with facebook</button>
                    <button class="social-signin twitter">Log in with Twitter</button>
                    <button class="social-signin google">Log in with Google+</button>
                </div>
                <div class="or">OR</div>
            </div>


        );
    }
}