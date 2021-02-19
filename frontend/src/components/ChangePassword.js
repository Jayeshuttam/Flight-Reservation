import react, { Component } from 'react';


class ChangePassword extends Component {
    render() {
        return (<div id="login-box" style={{ width: '25vw', height: '20vw', textAlign: 'center' }}>
            <div className="left">
                <form action='/changepassword' method='POST'>
                    <input type="password" name="new_pass" className="form-control" placeholder="New Password" />
                    <input type="password" name="confirm_new_pass" className="form-control" placeholder="Confirm Password" />
                    <input type="submit" className="btn btn-dark" />

                </form>
            </div>
        </div>
        );
    }
}
export default ChangePassword;