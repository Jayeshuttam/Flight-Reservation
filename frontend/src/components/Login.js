import React, { Component } from 'react';
import './css/SignUp.css';
import { Redirect, Switch } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      email: '',
      password: ''
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
    fetch("http://localhost:8080/users/login_verify", {
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => {
      console.log(response.text());
      this.setState({ uid: response.text() })
      localStorage.setItem('uid', this.state.uid)
      this.setState({ redirect: true })

    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      window.location.href = "/Home";
      //return <Redirect to='/Home' />;
    }
    return (<div id="login-box" style={{ height: 340 }}>
      <div className="left">
        <h1>Login </h1>


        <input type="text" name="email" placeholder="E-mail"
          value={this.state.email}
          onChange={(e) => this.handleChange({ email: e.target.value })}
        />
        <input type="password" name="password" placeholder="Password"
          value={this.state.phone}
          onChange={(e) => this.handleChange({ password: e.target.value })}
        />

        <input type="submit" name="signup_submit" value="Log in" onClick={(e) => this.create(e)} />
        <br /><br />
        <a href="/ResetPassword">Forget Password?</a>
      </div>

      <div className="right">
        <span className="loginwith" style={{ marginBottom: -25 }}>Sign in with<br />social network</span>

        <button className="social-signin facebook">Log in with facebook</button>
        <button className="social-signin twitter">Log in with Twitter</button>
        <button className="social-signin google">Log in with Google+</button>
      </div>
      <div className="or" style={{ top: 145 }}>OR</div>
    </div>)
  }
}
