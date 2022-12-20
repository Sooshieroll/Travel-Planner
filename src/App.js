// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';





// CSS
import './App.css';

// Components
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Planner from './pages/Planner';
import SearchForm from './pages/SearchForm';
import Scheduler from './components/Scheduler';
import Favorites from './pages/Favorites';




const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('jwtToken');
  console.log('===> Hitting a Private Route');
  return <Route {...rest} render={(props) => {
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login" />
  }} />
}



function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);



  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      console.log('====> Authenticated is now FALSE');
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);


  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrent is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }
  console.log(currentUser)
  return (
    <Router>
      <div className="App">
        <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
        <div className="container mt-5">
          <Switch>
            <Route path='/signup' component={Signup} />
            <Route
              path="/login"
              render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} />}
            />
            <PrivateRoute path="/profile" component={Profile} user={currentUser} handleLogout={handleLogout} />
            <PrivateRoute path="/profile/favorites" component={Favorites} user={currentUser} handleLogout={handleLogout} />
            <Route path="/planner" component={Planner} />
            <Route path="/" render={(props) => <SearchForm {...props} user={currentUser} true={true} />} />
            <Scheduler />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
