import React, { Component } from 'react';

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
      </div>
    )
  }
}

export default SignUp;