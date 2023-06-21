import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/Signup';
import Tasks from './components/Tasks';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';

const App = () => {
  // const params = useParams(
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/Tasks" element={<Tasks />} />
              <Route path="/AddTodo" element={<AddTodo />} />
              <Route path="/edit/:id" element={<EditTodo />} />



            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

const Navbar = () => {
  const location = useLocation();
//   const hideAuthLinks = location.pathname === "/Tasks" ;

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
      <Link className="navbar-brand" to="/sign-in">
          Todos Manager
        </Link>
        
        {!(location.pathname!== "/sign-in" && location.pathname!== "/sign-up" && location.pathname!=="/") && (
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign-up">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default App;
