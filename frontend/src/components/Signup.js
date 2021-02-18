import React, { Component } from "react";
import './css/SignUp.css';
import { Redirect } from 'react-router-dom';
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
                console.log(response)
                return <Redirect to='/Login' />
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className='container'>
                <form className="d-flex flex-column">
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" name="first_name"
                            value={this.state.first_name}
                            onChange={(e) => this.handleChange({ first_name: e.target.value })}

                        />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" name="last_name"
                            value={this.state.last_name}
                            onChange={(e) => this.handleChange({ last_name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email"
                            value={this.state.email}
                            onChange={(e) => this.handleChange({ email: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" placeholder="Phone" name="phone"
                            value={this.state.phone}
                            onChange={(e) => this.handleChange({ phone: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password"
                            value={this.state.password}
                            onChange={(e) => this.handleChange({ password: e.target.value })}
                        />
                    </div>

                    <button className="btn btn-primary btn-block" type='button' onClick={(e) => this.create(e)}>
                        Sign Up
                </button>

                    <p className="forgot-password text-right">
                        Already registered <a href="/Login">sign in?</a>
                    </p>
                </form>
            </div>
        );
    }
}