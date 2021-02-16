import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';

import {Redirect, Route,BrowserRouter as Router,Switch, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route exact path="/ResetPassword" component ={ResetPassword}/>
      <Route path="/ChangePassword"component={ChangePassword}/>
      <Redirect to="/ResetPassword"/>
    </Switch>
    </BrowserRouter>
</>


  );
}

export default App;