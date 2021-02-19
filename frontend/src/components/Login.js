import React, { Component } from 'react';
import './css/SignUp.css';

export default class Login extends Component{
    render(){
        return(  <div id="login-box" style={{height: 340}}>
        <div class="left">
          <h1>Login </h1>
          
         
          <input type="text" name="email" placeholder="E-mail" />
          <input type="password" name="password" placeholder="Password" />
             
          <input type="submit" name="signup_submit" value="Log in" />
          <br/><br/>
                    <a href="/ResetPassword">Forget Password?</a>
        </div>
        
        <div class="right">
          <span class="loginwith" style={{marginBottom: -25}}>Sign in with<br />social network</span>
          
          <button class="social-signin facebook">Log in with facebook</button>
          <button class="social-signin twitter">Log in with Twitter</button>
          <button class="social-signin google">Log in with Google+</button>
        </div>
        <div class="or" style={{top: 145}}>OR</div>
      </div>)
    }
}
