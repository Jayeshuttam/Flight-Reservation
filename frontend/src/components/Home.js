import React, { Component } from 'react';
import './css/Home.css';
import Image from './images/flight.jpg';

export default class Home extends Component{
    render(){
        return (
            <div class="" >
                <header>
              <div class="menu">
                        <li><a href='/Home'>Home</a></li> 
                        <li> <a href='/Booking'>Booking</a></li> 
                        <li> <a href='/Signup'>SignUp</a></li> 
                        <li> <a href='/Login'>Login</a></li> 
                        <li> <a href='/ContactUs'>ContactUs</a></li> 
                </div>  
            </header>
            <body>
                    <div class="content"
                     style={{
                        backgroundImage: 'url('+Image+')',
                        backgroundSize: "cover",
                        height: "150vh",
                        color: "#f5f5f5"
                      }}
                    >
                        <div class="container">
                            <h1>Make Your Reservation</h1>
                            <table>
                                <tr>
                                    <td colSpan="3">
                                        <div class="radiobtn">
                                            <input type="radio" id="roundtrip" name="flightType" />
                                            <label>Roundtrip</label> &nbsp;
                                            <input type="radio"  id="oneway" name="flightType" />
                                            <label>One Way</label>&nbsp;
                                            <input type="radio"  id="multicity" name="flightType"  />
                                            <label>Multi-city</label>&nbsp;
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                    <div class="form-group">
                                     <span class="label">FLYING FROM</span>
                                     <input class="option" type="text" name="destination" placeholder="city or airport" />
                                     </div>
                                    </td>

                                    <td>
                                    <div class="form-group">
                                     <span class="label">FLYING TO</span>
                                     <input class="option" type="text" name="destination" placeholder="city or airport" />
                                     </div>
                                    </td>

                                    <td>
                                        <div class="form-group">
                                         <span class="label">CHILDREN(0-17)</span>
                                          <select class="option">
                                          <option>--Select--</option>
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                          </select>
                                       </div>
                                    </td>

                                   
                                </tr>  
                                
                                <tr>
                                <td>
                                          <div class="form-group">
                                          <span class="label">ADULTS(18+)</span>
                                          <select class="option">
                                          <option>--Select--</option>
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                            </select>
                                        </div>
                                    </td>

                                    <td>
                                        <div class="form-group">
                                        <span class="label">DEPARTING</span>
                                        <input class="option" type="date" required />
                                        </div>
                                    </td>

                                    <td>
                                        <div class="form-group">
                                        <span class="label">RETURNING</span>
                                            <input class="option" type="date" required />
                                        </div>
                                    </td>
                                </tr>
                               
                                <tr>
                                    <td>
                                        <div class="form-group">
                                         <span class="label">TRAVEL CLASS</span>
                                          <select class="option">
                                          <option>Economy class</option>
                                          <option>Business class</option>
                                          <option>First class</option>
                                          </select>
                                        </div>
                                    
                                    </td>
                                    <td>
                                       <button class="submit">Show Flights</button>
                                    </td>
                                </tr>
                            </table>
                           
                        </div>
               
                    </div>
            </body>
       
                <footer>
                
                    <div class="footer">
                        <h3>Follow Us On:</h3>
                       <a class="icon ic-facebook whtxt">Facebook</a>
                </div>
                </footer>

        </div>
        );
    }
}