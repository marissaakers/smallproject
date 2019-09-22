import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'
import searchresult from './images/searchresults.png'
import searchagain from './images/searchagain.png'
import dashbutton from './images/dashboard.png'

console.log(searchagain);
console.log(dashbutton);
console.log(searchresult);

class SearchContactsResult extends Component {
  constructor(props) {
    super(props)
    console.log('type '+this.props.location.state.result)
    this.state = {
      result: this.props.location.state.result,
      jwt: this.props.location.state.jwt,
      redirect: false,
      contactList: [ {} ]
    }
    // this.parseResult()
  }

  parseResult = () => {
    let parsed = JSON.parse(this.state.result)
    console.log('parsed '+parsed.contacts)
    return parsed.contacts
  }

  mapResult = () => {
    let arr = this.parseResult()
    if(arr.length == 0) {
      return (
        <div>
          <p>No contacts with that name were found.</p>
        </div>
      )
    }
    return arr.map((n) =>
    <div>

      <li>Full Name: {n.name}</li>
      <li>Phone Number: {n.number}</li>
      <li>Email Address: {n.email}</li>
      <li></li>
      
    </div>
    )
  }

  render() {
    console.log()
    return(
      <div >
        <div> <img src={searchresult} width = "700"/> </div>
        <div style={styling.outerDiv}>
        <ul>{this.mapResult()}</ul>
            <div>
              <Link to={{
                pathname: '/users/dashboard',
                state: { jwt: this.state.jwt }
              }}><img src={dashbutton} width = "200"/></Link>
              <Link to={{
                pathname: '/contacts/search',
                state: { jwt: this.state.jwt }
              }}><img src={searchagain} width = "200"/></Link>
            </div>
        </div>
      </div>
    )
  }
}

const styling = {
  formDiv: {
    width: '50%',
  },
  outerDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8%'
  },
  dash: {
    justifyContent: 'center',
    margin: '15%'


  }
}

export default SearchContactsResult;
