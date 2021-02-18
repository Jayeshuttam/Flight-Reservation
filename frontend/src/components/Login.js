import React, { Component } from 'react';
import './css/SignUp.css';

export default class Login extends Component{
    render(){
        return(<div className='container position'>
            <div>
                <h1>Login</h1>
                <form action="/users/login_verify" method="POST" >
                    <input type="email" placeholder="Email" maxlength="100" name="email" className="form-control padding" required/>
                    <input type="password" placeholder="Password" maxlength="16" name="password" className="form-control padding" required/>
                    <input type="Submit" value="Login" className="form-control btn btn-primary padding"/>
                </form>
                <a href='/Signup' style={{'padding-top':'1vw'}}>Create Account</a><br/>
                <a href='/ResetPassword' style={{'padding-top':'1vw'}}>Forgot Password</a>
            </div>
        </div>)
    }
}
