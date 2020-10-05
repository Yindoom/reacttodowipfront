import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route, 
  NavLink
} from "react-router-dom";
import Dashboard from "../src/Components/dashboard";
import Home from "../src/Components/home";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <div className="navbar">
          <ul className="content">
            <li>
              <NavLink className="navlink" to="/">
                <div className="navButton">Home</div>
              </NavLink>
            </li>
            <li>
              <NavLink className="navlink" to="/dashboard">
                <div className="navButton">Dashboard</div>
              </NavLink>
            </li>
          </ul>
        </div>


        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
