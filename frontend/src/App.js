import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';

import {Redirect, Route,BrowserRouter as Router,Switch, BrowserRouter} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Home}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Signup" component={Signup}/>
      <Route exact path="/ResetPassword" component ={ResetPassword}/>
      <Route exact path="/ChangePassword"component={ChangePassword}/>
      <Redirect to="/"/>
    </Switch>
    </BrowserRouter>
</>


  );
}

export default App;