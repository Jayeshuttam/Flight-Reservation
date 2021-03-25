import React, { Component } from 'react'
import axios from 'axios';
//import './App.css';
import './main.css';
//import './util.css';
//import 'bootstrap/dist/css/bootstrap.css';
export default class Feedback extends Component {

    state={
        name:'',
        email:'',
        message:'',
        sent:false
    }

    //handle inputs

    handleName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    handleEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    handleMessage=(e)=>{
        this.setState({
            message:e.target.value
        })
    }

    formSubmit=(e)=>{
        e.preventDefault();

        let data ={
            name:this.state.name,
            email:this.state.email,
            message:this.state.message
        }
        axios.post('/api/form',data)
        .then(res=>{
            this.setState({
                sent:true
            },this.resetForm())
        }).catch(()=>{
            console.log("message not sent");
        })
    }

    // for reset initial data
    resetForm=()=>{
        this.setState({
            name:'',
            email:'',
            message:''
        })
        setTimeout(()=>{
            this.setState({
                sent:false
            })
        },3000)
    }

    render() {
        return (
            <div class="container-contact100">
                
                <div class="wrap-contact100">
                    
                <form class="contact100-form validate-form" onSubmit={this.formSubmit}>
                <div className={this.state.sent?'msgApear':'msg'} >
                <div className="feedback">
                        Thanks for feedback
                        </div>
                        
                        </div>
                <span class="contact100-form-title">
					Send Us A Message
				</span>
                
                <div class="wrap-input100 validate-input" data-validate="Please enter your name">
					<input class="input100" type="text" name="name" placeholder="Full Name"
                    value={this.state.name}
                    onChange={this.handleName}
                    />
					<span class="focus-input100"></span>
				</div>
                <div class="wrap-input100 validate-input" data-validate = "Please enter your email: e@a.x">
					<input class="input100" type="text" name="email" placeholder="E-mail"
                      value={this.state.email}
                      onChange={this.handleEmail}
                    />
					<span class="focus-input100"></span>
				</div>
               
                <div class="wrap-input100 validate-input" data-validate = "Please enter your message">
					<textarea class="input100" name="message" placeholder="Your Message"
                     value={this.state.message}
                     onChange={this.handleMessage}
                    ></textarea>
					<span class="focus-input100"></span>
				</div>
                <div class="container-contact100-form-btn">
                   
					<button type="submit" class="contact100-form-btn">
						<span>
							<i class="fa fa-paper-plane-o m-r-6" aria-hidden="true"></i>
							Send
						</span>
					</button>
				</div>
                </form>
                </div>
            </div>
        )
    }
}

