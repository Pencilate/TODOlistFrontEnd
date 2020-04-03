import React, { Component } from "react";
import { SnackbarProvider } from 'notistack';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import LoginPage from "./Login.js";
import TodoPage from "./Todo.js";

class App extends Component {

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
              {this.props.isAuthenticated ? <Redirect to="/todo" /> : <LoginPage/>} 
            </Route> 
            <PrivateRoute exact userAuth={this.props.isAuthenticated} path="/todo">
              <TodoPage/>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </SnackbarProvider>
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

const mapStateToProps = store => {
  return {
    isAuthenticated: store.userAuth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
