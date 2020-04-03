import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { withSnackbar } from 'notistack';

class LoginPage extends Component {
  initialState = {
    username: "",
    password: "",
    authStatus: ""
  };

  state = this.initialState;

    authenticate(username,password){
      var formData = new FormData();
      formData.append("username",username);
      formData.append("password",password);   
      console.dir(formData)
      fetch("http://localhost:8000/todoapi/login/",{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        // headers: {
        //   'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *client
        // body:JSON.stringify({"username":username,"password":password})
        body:formData
      }).then((response) => {
        let datapromise = response.json()
        console.dir(datapromise)
        switch(response.status){
          case 200:
            console.log("User Authenticated")
            this.props.userAuthHandler(true);
            break;

          case 401:
            this.setState({
              authStatus:'You have entered Invalid Credentials',
            })
            this.props.enqueueSnackbar('You have entered Invalid Credentials',{ variant: 'error', })
            break;

          case 400:
          case 405:
            datapromise.then(body=>{
              this.props.enqueueSnackbar(body.message,{ variant: 'error', })
            })
            break;

          default:
            this.props.enqueueSnackbar('Error occured when deleting TODOs',{ variant: 'error', })
        }
      }) .catch(() => {
        this.props.enqueueSnackbar('Unable to connect to server',{ variant: 'error', })
      });

    }

    handleSubmit = event => {
      event.preventDefault();
      this.authenticate(this.state.username,this.state.password)
    }

    handleChange = event => {
        const {name,value} = event.target
        this.setState({
            [name]:value,
        })
        this.setState({
          authStatus:'',
        })
    }

  render() {
    const { username, password } = this.state;
    return (
      <div id="LandingPage">
        <div id="LandingImage">
          <h1>TODOs. Noted.</h1>
        </div>
        <div id="LandingLogin">
          <div id="LoginForm" className="MuiTextField-root">
            <h1>Welcome Back.</h1>
            <form onSubmit={this.handleSubmit}>
              <TextField
                type="text"
                id="fieldUsername"
                name="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={this.handleChange}
              />
              <TextField
                type="password"
                id="fieldPassword"
                name="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={this.handleChange}
              />
              <p className="error" id="authenticationStatus">
                {this.state.authStatus}
              </p>
              <Button variant="outlined" type="submit" id="btnLogin">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withSnackbar(LoginPage));
