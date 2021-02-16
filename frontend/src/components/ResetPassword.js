import React,{Component} from "react";

class ResetPassword extends Component{
    render()
    {
        return(<div className="forgot">
        <form action='/forgot' method='POST'>
            <input type="email" name="email" maxLength="50" placeholder='Email' className="form-control" />
            <input type="submit" className="btn btn-dark" value="Submit" />
        </form>
    </div>);
    }
}
export default ResetPassword;