import React,{Component} from 'react';

export default class Home extends Component{
    render(){
        return(
            <div>
                <h1>Home</h1>
                <a href='/Login'>Login</a><br/>
                <a href='/Signup'>Create Account</a>
                
            </div>
        );
    }
}