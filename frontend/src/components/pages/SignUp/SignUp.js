import React, { Component } from 'react';
import MainSection from '../MainSection.js';
import MainSignup from './MainSignUp';
import {Button} from '../Button';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';


class SignUp extends Component() {
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

  render(){
  return (
    <>
      <MainSignup {...homeObjOne} />
      <MainSection {...homeObjThree} />
    </>
  );
  }
}

export default SignUp;