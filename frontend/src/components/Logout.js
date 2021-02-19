import React, { Component } from 'react';
import './css/SignUp.css';
import { Redirect, Switch } from 'react-router-dom';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.setState({ redirect: true })
        localStorage.removeItem('uid');

    }
    render() {
        window.location.href = "/Home";
        return null;
    }
}
