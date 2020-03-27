import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginPage from "./Login.js"
import TodoPage from "./Todo.js"


class App extends Component {

  state = {
    isAuthenticated: false,
  }
  
  handleAuthenticationUpdate(value){
    this.setState({
      isAuthenticated:value,
    })
  }

  render (){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <LoginPage userAuthHandler={this.handleAuthenticationUpdate.bind(this)}/>
            </Route>
<<<<<<< HEAD
            <PrivateRoute exact userAuth={this.state.isAuthenticated} path="/todo">
              <TodoPage userAuthHandler={this.handleAuthenticationUpdate.bind(this)}/>
=======
            <PrivateRoute exact userAuth={this.state.userAuth} path="/todo">
              <TodoPage userAuth={this.state.userAuth}/>
>>>>>>> Renamed Todo to TodoPage
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}


function PrivateRoute({children, userAuth,...rest}){
  return(<Route
    {...rest}
    render={({location})=> userAuth ?
    (
      children
    ) : (
      //children
      <Redirect to="/"/>
    )
    }
  />)

}

export default App;