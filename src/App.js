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
      userId: -1,
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
          // credentials: 'same-origin', // include, *same-origin, omit
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
            datapromise.then((body)=>{
              console.log("UserID is "+ body.userId)
              this.userId = body.userId;
            });
            this.isAuthenticated = true;
          }else{
            this.isAuthenticated = false;
          }
          console.log("User Authenticated?: "+this.isAuthenticated)
          this.waitingForResponse = false;
        })  
      },
      logout(){
        this.isAuthenticated = false;
      }
    }
  }

  
  render (){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home userAuth={this.state.userAuth} />
            </Route>
            <PrivateRoute userAuthed={this.state.userAuth.isAuthenticated} path="/todo">
              <Todo userAuth={this.state.userAuth}/>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}



function PrivateRoute({children,userAuthed,...rest}){
  console.dir(userAuthed)
  alert("PrivateRoute User Authenticated?: "+userAuthed);
  return(<Route
    {...rest}
    render={({location})=> userAuthed ?
    (
      children
    ) : (
      // children
      <Redirect to={{pathname:"/",state:{from:location}}}/>
      // <Redirect to="/"/>
    )
    }
  />)
}

function Todo(){
  return (
    <div>
      <h1>Work in Progress</h1>
    </div>
  );
}

export default App;