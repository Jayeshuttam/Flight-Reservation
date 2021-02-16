import react,{Component} from 'react';


 class ChangePassword extends Component{
    render(){
        return(
            <form action='/changepassword' method='POST'>
                <input type="password" name="new_pass" className="form-control" placeholder="New Password"/>
                <input type="password" name="confirm_new_pass" className="form-control" placeholder="Confirm Password"/>
                <input type="submit" className="btn btn-dark"/>

            </form>
        );
    }
}
export default ChangePassword;