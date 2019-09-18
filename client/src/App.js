import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './pages/landing'
import SignUp from './pages/users.signup'
import Login from './pages/users.login'
// import Dashboard from './pages/dashboard'
import './App.css';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/users/signup' component={SignUp} />
          <Route path='/users/login' component={Login} />
          <Route path='/users/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
