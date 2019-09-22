import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'
import addcontact from './images/addcontact.png'
import addmore from './images/addmore.png'
import dashbutton from './images/dashboard.png'

console.log(addcontact);
console.log(addmore);
console.log(dashbutton);


class AddContactConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.location.state.name,
      jwt: this.props.location.state.jwt,
      redirect: false,
      showName: false
    }
    console.log(this.state.name)
  }

  render() {
    return(
      <div >
        <div> <img src={addcontact} width = "700"/> </div>
        <div styling={styling.para}>
          <p>{this.state.name + ' created...'}</p>
        </div>
        <div style={styling.outerDiv}>
          <Link to={{
                pathname: '/contacts/create-contact',
                state: { jwt: this.state.jwt }
          }}><img src={addmore} width = "200"/></Link>
          <Link to={{
            pathname: '/users/dashboard',
            state: { jwt: this.state.jwt }
          }}> <img src={dashbutton} width = "200"/> </Link>
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
  },
  para: {
    justifyContent: 'center',
    margin: '8%'
  },
  addcontact: {
    justifyContent: 'center',
    margin: '15%'
  }
}

export default AddContactConfirmation;
