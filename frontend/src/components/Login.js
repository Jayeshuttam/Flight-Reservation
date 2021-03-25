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
    e.preventDefault();

    var details = {
      'email': this.state.email,
      'password': this.state.password
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // creates entity
    /* fetch("http://localhost:8080/users/login_verify", {
       "method": "POST",
       "headers": {
         "content-type": "application/x-www-form-urlencoded",
         "accept": "application/json"
       },
       "mode": 'no-cors',
       "body": formBody
     })
       .then(resp => resp.JSON()).then(json => console.log(json))
       .catch(err => {
         console.log(err)
       })
   */
    // create an XHR object
    const xhr = new XMLHttpRequest();

    // listen for `onload` event
    xhr.onload = () => {
      // process response
      if (xhr.status == 200) {
        // parse JSON data
        var result = JSON.parse(xhr.response);
        if (result.status == 1) {
          this.setState({ uid: result.results.email })
          localStorage.setItem('uid', this.state.uid)
          this.setState({ redirect: true })
        }
      } else {
        console.error('Error!');
      }
    };

    // set headers

    xhr.open('POST', 'http://localhost:8080/users/login_verify');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // send request
    xhr.send(formBody);
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
