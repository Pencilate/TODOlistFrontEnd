
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  Redirect,
  withRouter
} from "react-router-dom";

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
        this.props.userAuth.authenticate(this.state.username,this.state.password)
        // this.props.userAuth.checkAuth();
        this.props.history.replace('/todo');
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

  export default withRouter(Home)