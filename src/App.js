import React from 'react';
import './App.css';
import {Component} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/todo">
            <Todo />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'no-cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       // 'Content-Type': 'application/json'
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *client
//     // body: JSON.stringify(data) // body data type must match "Content-Type" header
//     body: data // body data type must match "Content-Type" header
//   }).then()
//   return await response.json(); // parses JSON response into native JavaScript objects
// }

const userAuth = {
  isAuthenticated: false,
  async authenticate(username,password){
    var formData = new FormData();
    formData.append("username",username);
    formData.append("password",password);   
    console.dir(username)
    console.dir(password)
    console.dir(formData)
    fetch("http://localhost:8000/todoapi/login/",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      // headers: {
      //   'Content-Type': 'application/json'
      //   // 'Content-Type': 'application/x-www-form-urlencoded',
      // },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *client
      // body:JSON.stringify({"username":username,"password":password})
      body:formData
    }).then((response) => {
      console.log(response.status)
      console.dir(response)
      return response.json()
    })  
    .then((data) => {
      console.dir(data)
      console.log('Success:', data);
      console.log("UserID is "+data.userId)
      userAuth.isAuthenticated = true;
      console.log("User Authenticated?: "+userAuth.isAuthenticated)
      window.location.href = process.env.PUBLIC_URL + "/todo"
    })
    .catch((error) => {
      console.dir(error)
      console.error('Error:', error);
      userAuth.isAuthenticated = false;
      console.log("User Authenticated?: "+userAuth.isAuthenticated)

    });
    // console.log("User Authenticated?: "+userAuth.isAuthenticated)
  },
  logout(){
    userAuth.isAuthenticated = false;
  }
}

function PrivateRoute({children,...rest}){
  alert("PrivateRoute User Authenticated?: "+userAuth.isAuthenticated);
  return(<Route
    {...rest}
    render={({location})=> userAuth.isAuthenticated ?
    (
      children
    ) : (
      <Redirect to={{pathname:"/",state:{from:location}}}/>
    )
    }
  />)
}

class Home extends Component{
  initialState = {
      username: '',
      password: '',
  }

  state = this.initialState

  handleChange = event => {
      const {name,value} = event.target
      this.setState({
          [name]:value,
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    userAuth.authenticate(this.state.username,this.state.password)
    // alert("Submitted");
  }


  render(){
      const {username,password} = this.state;
      return (
          <div id="LandingPage">
            <div id="LandingImage">
              <h1>TODOs. Noted.</h1>
            </div>
            <div id="LandingLogin">
              <div id="LoginForm" className="MuiTextField-root">
                <h1>Welcome Back.</h1>
                <form onSubmit={this.handleSubmit}>
                  <TextField type="text" id="fieldUsername" name="username" label="Username" variant="outlined" value={username} onChange={this.handleChange}/>
                  <TextField type="password" id="fieldPassword" name="password" label="Password" variant="outlined" value={password} onChange={this.handleChange}/>
                  <Button variant="outlined" type="submit" id="btnLogin" >Login</Button>
                </form>
              </div>
            </div>
          </div>
        
          );
  }
}

function Todo(){
  return (
    <div>
      <h1>Work in Progress</h1>
    </div>
  );
}

export default App;
