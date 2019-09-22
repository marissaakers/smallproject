import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import logo from './rybamatransparent.png'; // Tell Webpack this JS file uses this image
import signuplogo from './signupdim.png';
import loginlogo from './logindim.png';
import signuplit from './signup_lit.png'
import loginlit from './signuplit.png'

console.log(logo);
console.log(loginlogo);
console.log(signuplogo);
console.log(signuplit);
console.log(loginlit);

class Landing extends Component {
  render() {
    return(
      <div style={styling.mainDiv} >

      <div> <img src={logo} width = "800"/> </div>

      <div style={styling.buttonDiv}>
        <a href="#" id="image"><Link to="/users/signup"><input type="image" src={signuplogo} onMouseOver="this.src={signuplit}" onMouseOut="this.src='./signupdim.png'"  width = "700"/></Link></a>
        <Link to="/users/login"><input type="image" src={loginlogo} width = "700"/></Link>
      </div>
    </div>
    )
  }
}

const styling = {
  mainDiv: {
    background: '#200c4c',
    textAlign: 'center'
  },
  buttons: {


  },
  signup: {

    marginRight: '30%'
  },
  buttonDiv: {


    justifyContent: 'center',

  }
}

export default Landing;
