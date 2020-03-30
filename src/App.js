import React, { Component } from "react";
import { SnackbarProvider } from 'notistack';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginPage from "./Login.js";
import TodoPage from "./Todo.js";

class App extends Component {
  state = {
    isAuthenticated: false
  };

  handleAuthenticationUpdate = value => {
    this.setState({
      isAuthenticated: value
    });
  };

  render() {
    return (
      <SnackbarProvider 
      maxSnack={1}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      >
        <Router>
          <div className="App">
            <Switch>
            <Route exact path="/"> 
              {this.state.isAuthenticated ? <Redirect to="/todo" /> : <LoginPage userAuthHandler={this.handleAuthenticationUpdate} userAuth={this.state.isAuthenticated}/>} 
            </Route> 
            <PrivateRoute exact userAuth={this.state.isAuthenticated} path="/todo">
              <TodoPage userAuthHandler={this.handleAuthenticationUpdate}/>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ children, userAuth, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAuth ? (
          children
        ) : (
          //children
          <Redirect to="/" />
        )
      }
    />
  );
}

export default App;
