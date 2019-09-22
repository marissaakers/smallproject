import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'
import searchpic from './images/searching.png'
import submitbutton from './images/submit.png'
import dashbutton from './images/dashboard.png'


console.log(searchpic);
console.log(submitbutton);
console.log(dashbutton);

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchName: '',
      jwt: this.props.location.state.jwt,
      result: '',
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
        if(response.status == 200 || response.status == 201) {
          this.setState({
            showName: true
          })
        }
        return response.text()
      })
      .then((data) => {
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
        <img src={searchpic} width = "600"/>
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
                  <div class= "container">
                    <Button variant="link" onClick={(e) => this.onSubmit()} >
                      <img src={submitbutton} width = "200"/>
                    </Button> </div>
                </div>
                <div>
                <Link to={{
                  pathname: '/users/dashboard',
                  state: { jwt: this.state.jwt }
                }}> <img src={dashbutton} width = "200"/> </Link>
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
    margin: '-70px'
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
