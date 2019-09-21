import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Landing from './pages/landing'
import SignUp from './pages/users.signup'
import Login from './pages/users.login'
import Dashboard from './pages/dashboard';
import AddContact from './pages/addContact'
import Search from './pages/search'
import ShowContact from './pages/showContact'

import AddContactConfirmation from './pages/addcontactconfirmation'

import SearchContactsResult from './pages/searchContactsResult'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/users/signup' component={SignUp} />
          <Route path='/users/login' component={Login} />
          <Route path='/users/dashboard' component={Dashboard} />
          <Route path='/contacts/create-contact' component={AddContact} />
          <Route path='/contacts/search' component={Search} />
          <Route path='/contacts' component={ShowContact} />

          <Route path='/add-contact-confirmation' component={AddContactConfirmation} />

          <Route path='/search-contacts/result' component={SearchContactsResult} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
