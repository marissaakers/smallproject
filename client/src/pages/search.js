import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchName: '',
      jwt: this.props.location.state.jwt,
      result: [{}],
      redirect: false,
      found: false
    }
    this.handleSearchNameChange = this.handleSearchNameChange.bind(this);
  }

  handleSearchNameChange = (e) => {
    this.setState({
      searchName: e.target.value
    })
    console.log(this.state.searchName)
  }

  postAndFetchData = (path) => {
    fetch('http://localhost:3000/' + path , {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.state.jwt
      },
      body: JSON.stringify(this.state)
      })
      .then((response) => {
        // this.setState({result: response.clone().json()})
        // response.json()
        // console.log(response.json())
        return response.text()
        //return JSON.stringify(response.clone().json())
      })
      .then((data) => {
        console.log('returned data: ' + data)
        this.setState({result: data})
      })
      .then(() => {this.setRedirect()})
      .catch(() => {
        console.log('didnt post')
      })
  }

  onSubmit = (e) => {
    if(e) {
      e.preventDefault()
    }
    this.postAndFetchData('contacts/search')
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/search-contacts/result', 
        state: {
          jwt: this.state.jwt,
          result: this.state.result
        }
      }}/>
    }
  }

  render() {
    return(
      <div >
        <h1 style={{margin: '5%'}}>Search</h1>
        <div style={styling.outerDiv}>
          <Form style={styling.formDiv}>
            <FormGroup>
              <FormLabel>Full Name</FormLabel>
              <FormControl placeholder="insert full name" value={this.state.searchName} onChange={this.handleSearchNameChange} />
            </FormGroup>
            <div>
            
            </div>
            
            <div>
              {this.renderRedirect()}
              <Button variant="primary" onClick={(e) => this.onSubmit()} >
                Submit
              </Button>
            </div>
            <div>
              <Link to={{
                pathname: '/users/dashboard',
                state: { jwt: this.state.jwt }
              }}><Button style={styling.buttons}>Dashboard</Button></Link>
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
  },
  buttons: {
    justifyContent: 'center',
    margin: '8%'


  }
}

export default Search;