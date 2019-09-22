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
      result: '',
      redirect: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    this.mounted = true
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
      console.log(response.status)
      if((response.status == 200 || response.status == 201) && this.mounted == true) {
        this.setState({redirect: true})
        return response.text()
      } else if ((response.status == 401 || response.status == 400 || response.status == 500 ) && this.mounted == true) {
        console.log('hit else if')
        return this.setState({
          redirect: false,
          result: 'Username already exists.'
        })
      }
    })
    .catch()
  } 

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/users/login' />
    }
  }

  componentWillUnmount() {
    this.mounted = false
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
            <p>{this.state.result}</p>
          </div>
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