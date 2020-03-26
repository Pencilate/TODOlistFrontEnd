import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./Home.js"


class App extends Component {

  state = {
    userAuth: {
      waitingForResponse: false,
      isAuthenticated: false,
      authenticate(username,password){
        this.waitingForResponse = true;
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
          if(response.ok){
            console.log("User Authenticated")
          }
          this.waitingForResponse = false;
        })  
      },
      logout(){
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
          }
          this.waitingForResponse = false;
        })  
      },
      checkAuth(){
        fetch("http://localhost:8000/todoapi/todos/",{
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          // headers: {
          //   'Content-Type': 'application/json'
          //   'Content-Type': 'application/x-www-form-urlencoded',
          // },
          // redirect: 'follow', // manual, *follow, error
          // referrerPolicy: 'no-referrer', // no-referrer, *client
          // body:JSON.stringify({"username":username,"password":password})
        //   body:formData
        }).then((response) => {
          console.log("CheckAuth: "+response.ok)
          // this.setState({
          //     isAuthenticated: response.ok,
          // })
          this.isAuthenticated = response.ok
        });    
      }
    }
  }
  
  render (){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home userAuth={this.state.userAuth}/>
            </Route>
            <PrivateRoute exact userAuth={this.state.userAuth} path="/todo">
              <Todo userAuth={this.state.userAuth}/>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}


function PrivateRoute({children, userAuth,...rest}){
  userAuth.checkAuth()
  return(<Route
    {...rest}
    render={({location})=> userAuth.isAuthenticated ?
    (
      children
    ) : (
      //children
      <Redirect to="/"/>
    )
    }
  />)

}

function Todo(){
  return (
    <div>
      <h1>Work in Progress</h1>
      <button onClick={(event)=>{
        event.preventDefault();
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
          }
        })  
        window.location.replace(process.env.PUBLIC_URL);
      }}>Logout</button>
    </div>
  );
}

export default App;