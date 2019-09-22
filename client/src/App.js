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
import NotFound from './pages/notFound'
import AddContactConfirmation from './pages/addcontactconfirmation'
import SearchContactsResult from './pages/searchContactsResult'


// Maps out every URL that has a component and links that URL with corresponding component
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/users/signup' component={SignUp} />
          <Route exact path='/users/login' component={Login} />
          <Route exact path='/users/dashboard' component={Dashboard} />
          <Route exact path='/contacts/create-contact' component={AddContact} />
          <Route exact path='/contacts/search' component={Search} />
          <Route exact path='/contacts' component={ShowContact} />
          <Route path='/add-contact-confirmation' component={AddContactConfirmation} />
          <Route path='/search-contacts/result' component={SearchContactsResult} />
          <Route component={NotFound} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
