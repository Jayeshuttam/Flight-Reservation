import React, { Component } from "react";

class ResetPassword extends Component {
    render() {
        return (<div id="login-box" style={{ width: '32vw', height: '20vw', textAlign: 'center' }}>
            <h2>Forget Password</h2>
            <form action='/forgot' method='POST'>
                <div className="form-group">
                    <input type="text" className="form-control" style={{ marginLeft: "70px", marginTop: "45px" }} name="email" maxLength="50" placeholder='Email' />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>);
    }
}
export default ResetPassword;