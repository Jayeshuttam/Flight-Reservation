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
                        height: "170vh",
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
                        <div class="homeContent">
                          <div class="aboutContent">
                            <h2>Book Your Next Trip with Us!</h2>
                            <p>
                                    Need to get away? Do it for less with us. Our travel experts work with more than 400 airlines worldwide to track down
                                    low prices for our customers. This Spring, we’re bringing you even more fares that we’ve worked hard to ensure will be easy on your wallet.
                                    Whatever your budget for traveling, book your tickets on us with confidence that you’re getting a great deal! 
                                    With vast experience and knowledge of the industry, we promise to give you the best advice.
                                    We carefully handpick flights and guides to offer you the top-quality services. <br /><br />
                                    We provide value added services, excellent custom services 24/7 and pay keen attention to details. We pride ourselves in our fast response 
                                    rate and happy customers’ track record. We go extra miles to make yours a most uniquely personal travel experience. <br /><br />
                                    Travel solo or in a group, on a shoestring budget or in luxury, we will make it the most pleasant travel experience of your life.
                                     We customize your vacation so that you don’t miss anything and have a perfect trip.
                            </p>
                            </div>
                            <div class="review">
                                <h2>User Reviews</h2>
                                <p>
                                    <span>&#11088;</span> <span>&#11088;</span> <span>&#11088;</span><span>&#11088;</span>
                                    Helped Me a lot <br/>
                                    The agent very nice help me with my rebooking -
                               <em>
                                        <strong>Manjit Singh</strong>   
                                        &nbsp; jan 20, 2021
                               </em>
  
                                </p><br />
                                <p>
                                    <span>&#11088;</span> <span>&#11088;</span> <span>&#11088;</span><span>&#11088;</span><span>&#11088;</span>
                                    Very happy<br />
                                    Fantastic, painless and quickly resolved flight change due to covid. Very happy with the service - 
                                    <em>
                                        <strong>Prabhjot</strong>
                                        &nbsp; Dec 23, 2020
                                    </em>
                                 
                                </p>
                            </div>
                            <button class="submitReview">Submit Review</button>
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