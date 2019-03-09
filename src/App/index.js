import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './App.css';

import StateClass from '../Classes/State';
import ReduxClass from '../Classes/Redux';
import StateHooks from '../Hooks/State';
import ReducerHooks from '../Hooks/Reducer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <header className="App-header">
              <nav className="App-nav">
                <NavLink className="App-link" to="/state-class">
                  State Class
                </NavLink>
                <NavLink className="App-link" to="/redux-class">
                  Redux Class
                </NavLink>
                <NavLink className="App-link" to="/state-hooks">
                  State Hooks
                </NavLink>
                <NavLink className="App-link" to="/reducer-hooks">
                  Reducer Hooks
                </NavLink>
              </nav>
            </header>
            <Switch>
              <Route path="/state-class" component={StateClass} />
              <Route path="/redux-class" component={ReduxClass} />
              <Route path="/state-hooks" component={StateHooks} />
              <Route path="/reducer-hooks" component={ReducerHooks} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
