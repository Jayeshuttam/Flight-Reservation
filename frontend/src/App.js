import logo from './logo.svg';
import './App.css';

import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';

import { Redirect, Route, BrowserRouter as Router, Switch, BrowserRouter } from 'react-router-dom';

import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer/Footer';
import Home from './components/pages/HomePage/Home';
import SignUp from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Verify from './components/Verify';
import MyFlights from './components/pages/bookFlight/myFlights';
//import { feedback } from '../../backend/controller/feedback';
import Feedback from './components/pages/Contact/Feedback';
//import SignUp from './components/pages/SignUp/SignUp';
import Flights from './components/pages/bookFlight/Flights'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/flights' component={Flights} />
          <Route path='/feedback' component={Feedback} />
          <Route path='/ResetPassword' component={ResetPassword} />
          <Route path='/ChangePassword' component={ChangePassword} />
          <Route path='/ChangePassword' component={ChangePassword} />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/Login' component={Login} />
          <Route path='/Logout' component={Logout} />
          <Route path='/My-Bookings' component={MyFlights} />
          <Redirect to='/' />
        </Switch>
        <Footer />
      </Router>
    </>


  );
}

export default App;