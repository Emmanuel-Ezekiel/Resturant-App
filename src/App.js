import React from 'react'

import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Restaurant from './components/restaurant';
import RestaurantList from './components/restaurant-list';
import AddReview from './components/add-review';
import Login from './components/login';



function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
       <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurant" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/restaurant" className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <span  onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </span>
            ) : (            
            <Link to="/login" className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>
    <div className="container mt-3">
        <Routes>
            {["/restaurant", "/"].map((path, index) => 
        <Route exact path={path} element={<RestaurantList/>} key={index} />
    )}
          <Route 
            path="/restaurant/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurant/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={props =>  < Login {...props} login={login} /> }
          />
        </Routes>
      
      </div>
    </div>
  );
}

export default App;
