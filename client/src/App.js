import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './pages/landing'
import SignUp from './pages/users.signup'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/users/signup' component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
