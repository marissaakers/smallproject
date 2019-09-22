import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'

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
        <h1 style={{margin: '5%'}}>Search Results</h1>
        <div style={styling.outerDiv}>
        <ul>{this.mapResult()}</ul>
            <div>
              <Link to={{
                pathname: '/users/dashboard',
                state: { jwt: this.state.jwt }
              }}><Button style={styling.dash}>Dashboard</Button></Link>
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