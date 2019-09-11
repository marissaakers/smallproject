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
  }

  render() {
    return(
      <div>
        <h1>Sign Up</h1>
        <div>
        <Form>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormControl type="username" placeholder="username" />
          </FormGroup>

          <FormGroup controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <Form.Control type="password" placeholder="password" />
          </FormGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
      </div>
    )
  }
}

export default SignUp;