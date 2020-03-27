import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginPage from "./Login.js"


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
            <PrivateRoute exact userAuth={this.state.isAuthenticated} path="/todo">
              <TodoPage userAuthHandler={this.handleAuthenticationUpdate.bind(this)}/>
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

function TodoPage(){

  const logout = () => {
    fetch("http://localhost:8000/todoapi/logout/",{
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
      // body:""
    }).then((response) => {
      let datapromise = response.json()
      console.dir(datapromise)
      if(response.ok){
        console.log("User Logged Out")
        this.props.userAuthHandler(false);
      }
    })  
  }

  return (
    <div>
      <h1>Work in Progress</h1>
      <button onClick={(event)=>{
        event.preventDefault();
        logout()
        window.location.replace(process.env.PUBLIC_URL);
      }}>Logout</button>
    </div>
  );
}

export default App;