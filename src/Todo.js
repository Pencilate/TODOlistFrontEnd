
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Chip from '@material-ui/core/Chip'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import {
  Redirect,
  withRouter
} from "react-router-dom";

const useStyles = theme => ({
    root: {
      minWidth: 260,
      minHeight: 260,
      maxWidth: 260,
      maxHeight: 260,
      position:'relative',
      margin: '1em',
    },
    header: {
        paddingBottom:0,

        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-box-orient':'vertical',
        '-webkit-line-clamp':1,
    },
    todoChipUnfinished: {
        margin: '0 1em',
        backgroundColor: '#EBAF26',
        color: '#FFFFFF',

    },  
    todoChipDone: {
        margin: '0 1em',
        backgroundColor: '#8B8B8C',
        color: '#FFFFFF',
    },
    actions:{
        position:'absolute',
        bottom:0,
    },
    content:{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-box-orient':'vertical',
        '-webkit-line-clamp':5,
    },
    contentContainer:{
        padding: '0.5em ,0',
    }

});

//  GetTodo = () =>{
    async function GetTodo(){

        // var formData = new FormData();
        // formData.append("username","John");
        // formData.append("password","12345");   
        // console.dir(formData)
        // fetch("http://localhost:8000/todoapi/login/",{
        //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, *cors, same-origin
        //   // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: 'include', // include, *same-origin, omit
        //   // headers: {
        //   //   'Content-Type': 'application/json'
        //   'Content-Type': 'application/x-www-form-urlencoded',
        //   // },
        //   // redirect: 'follow', // manual, *follow, error
        //   // referrerPolicy: 'no-referrer', // no-referrer, *client
        //   // body:JSON.stringify({"username":username,"password":password})
        //   body:formData
        // }).then(()=>{

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
          let datapromise = response.json();
          console.dir(datapromise);
          if(response.ok){
            datapromise.then((body)=>{
              console.dir(body.records);
              return [true,body.records];
            });
          }else{
            console.log("response not ok")
            return [false];
          }
        })  
        // })
}

class TodoPage extends Component{

    initialState = {
        currentTodo:{
            id: '',
            title: '',
            description: '',
            status: false,
        },
        todorecords: [
            {
                "id": 1,
                "title": "TestFromPM7",
                "description": "Sent from postman",
                "status": true
            },
            {
                "id": 2,
                "title": "Second",
                "description": "Second note",
                "status": false
            },
            {
                "id": 3,
                "title": "TestFromPM3",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem purus, pretium nec scelerisque et, commodo vitae diam. Cras interdum quam id metus molestie, vitae dignissim tellus vehicula. Donec fringilla enim ac maximus vulputate. Donec ac diam sagittis, malesuada velit eget, tincidunt lectus. Duis at mauris leo. Curabitur ut ligula at felis sollicitudin lobortis sit amet at erat. Curabitur cursus pharetra eros. Morbi malesuada cursus dolor, a malesuada urna. Pellentesque nec erat ut augue vehicula laoreet id at ante. Curabitur pharetra commodo nulla eget consectetur. Aliquam erat volutpat. Integer in eleifend velit. Nunc vulputate feugiat massa consequat scelerisque.",
                "status": false
            },
        ]
    }
  
    state = this.initialState

    handleTodoContentChange = event => {
        const {name,value} = event.target
        this.setState({
            currentTodo:{
                [name]:value,
            }
        })
    }

    handleTodoCardClick = event => {
        event.preventDefault();
        const {name,value} = event.target
        console.dir(event.target)
        this.setState({
            currentTodo:{
                id:event.target.parentElement.value,
                title: this.state.currentTodo.title,
                description: this.state.currentTodo.description,
                status: this.state.currentTodo.status,
            },
        })
    }

    componentDidMount(){
        let todoData =  GetTodo();
        alert(todoData);
        if(todoData[0] == true){
            console.log("Retrieved Data from API success")
            this.setState({
                todorecords:todoData[1]
            })
        }
        else{
            console.log("Retrieved Data from API failed")

        }
    }
    render(){

        const { classes } = this.props;

        const TodoContent = props =>{
            const todos = props.todolist.map((todo,index)=>{ 

                let chip = undefined;
                if(todo.status === true){
                    chip = <Chip label="DONE" className={classes.todoChipDone}/>
                }else{
                    chip = <Chip label="TODO" className={classes.todoChipUnfinished}/>
                }
                return (
                    <Card className={classes.root} elevation={3} key={index}>
                    <CardHeader className={classes.header} title={todo.title} />
                    {chip}
                    <CardContent className={classes.contentContainer}>
                        <Typography className={classes.content} variant="body1" component="p">
                            {todo.description}    
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button size="small" name="id" value={todo.id} onClick={this.handleTodoCardClick}>View</Button>
                    </CardActions>
                    </Card>
                )
            })
            return <div id="TodoContent">{todos}</div>
        }



        return (
            <div id="TodoPage">
                <header id="TodoHeader">
                
                    <h1>TODOs. Noted.</h1>
                    <div>
                        <Button variant="contained" id="btnCreateTodo" startIcon={<AddTwoToneIcon/>}>Create</Button>
                        <Button variant="contained" id="btnLogout" startIcon={<ExitToAppIcon/>}>Logout</Button>
                    </div>
                </header>
                <TodoContent todolist={this.state.todorecords}/>
            </div>
        );
    }
  }

  export default withStyles(useStyles)(TodoPage)