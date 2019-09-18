import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      response: '',
      redirect: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      this.setState({response: data}) 
      console.log('state: ' + this.state.response)
    })
    .then(() => {this.setRedirect()})
  } 

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/users/login' />
    }
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
          <div>
            {this.renderRedirect()}
            <Button variant="primary" onClick={this.onSubmit} >
              Submit
            </Button>
          </div>
          {/* <p>{this.state.result.statusText}</p> */}
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