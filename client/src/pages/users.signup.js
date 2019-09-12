import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
    console.log(this.state.username)
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
    console.log(this.state.password)
  }

  onSubmit = (e) => {
    fetch('http://localhost:3000/users/signup' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
      })
      .then((result) => {
        console.log(result)
        result.json()
      })
      .then((info) => { console.log(info); })
    } 

  render() {
    return(
      <div >
        <h1 style={{margin: '5%'}}>Sign Up</h1>
        <div style={styling.outerDiv}>
        <Form style={styling.formDiv}>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormControl type="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/>
          </FormGroup>

          <FormGroup controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <Form.Control type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </FormGroup>
          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
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
  }
}

export default SignUp;