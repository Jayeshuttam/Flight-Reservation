import React, { Component } from 'react'
import "../FlightPortal/style.css";

export default class FlightPortal extends Component {
    render() {
        return (
           
            <section class="ftco-section">
                <div class="container">
                    <div class="row justify-content-center">
                        
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="h5 mb-4 text-center">Flights</h3>
                            <div class="table-wrap">
                                <table class="table">
                                  <thead class="thead-primary">
                                    <tr>
                                        <th>Flight No</th>
                                        <th>Departing From</th>
                                        <th>Departing To</th>
                                      <th>Departing Date</th>
                                      <th>Returning Date</th>
                                      <th>Adults</th>
                                      <th>Childrens</th>
                                      <th>Travel Class</th>
                                      <th>Price</th>
                                      <th>&nbsp;</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr class="alert" role="alert">
                                        <td>
                                            <label class="checkbox-wrap checkbox-primary">
                                                  <span>1234556</span>
                                            </label>
                                        </td>
                                        <td>
                                        <div class="departingFrom">
                                              <span>YYZ </span>
                                              
                                        </div>
                                        </td>
                                      <td>
                                          <div class="departingTo">
                                              <span>YVR</span>
                                              
                                          </div>
                                      </td>
                                      <td>2020/5/1</td>
                                      <td >
                                        2020/8/1
                                      
                                  </td>
                                  <td>2</td>
                                      <td>
                                      1
                                    </td>
                                     <td>
                                     Economy
                                    </td>
                                    <td>$30.99</td>
                                    <td><button class="ButtonBookNow">Book Now</button> </td>
                                    </tr>
        
                                    
                                  </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            
   
        )
    }
}
