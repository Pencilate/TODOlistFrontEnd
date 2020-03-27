import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

import { Redirect, withRouter } from "react-router-dom";

const useTodoCardStyles = theme => ({
  root: {
    minWidth: 260,
    minHeight: 260,
    maxWidth: 260,
    maxHeight: 260,
    position: "relative",
    margin: "1em"
  },
  header: {
    paddingBottom: 0,

    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 1
  },
  todoChipUnfinished: {
    margin: "0.5em 1em",
    backgroundColor: "#EBAF26",
    color: "#FFFFFF"
  },
  todoChipDone: {
    margin: "0.5em 1em",
    backgroundColor: "#8B8B8C",
    color: "#FFFFFF"
  },
  actions: {
    position: "absolute",
    bottom: 0
  },
  content: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 5
  },
  contentContainer: {
    padding: "0.5em ,0"
  },
  paper: {
    position: "absolute",
    width: "60%",
    height: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "25%",
    left: "20%",
    display: "block"
  },
  modalContent: {
    height: "90%"
  },
  modalButton: {
    height: "10%"
  }
});

//  GetTodo = () =>{
async function GetTodo() {
  fetch("http://localhost:8000/todoapi/todos/", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include" // include, *same-origin, omit
    // headers: {
    //   'Content-Type': 'application/json'
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *client
    // body:JSON.stringify({"username":username,"password":password})
    //   body:formData
  }).then(response => {
    let datapromise = response.json();
    console.dir(datapromise);
    if (response.ok) {
      console.log("Data response OK");
      datapromise.then(body => {
        console.dir(body.records);
        return [true, body.records];
      });
    } else {
      console.log("response not ok");
      return [false];
    }
  });
}

async function GetTodoSpecific(todoID) {
  fetch("http://localhost:8000/todoapi/todos/" + todoID, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include" // include, *same-origin, omit
    // headers: {
    //   'Content-Type': 'application/json'
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *client
    // body:JSON.stringify({"username":username,"password":password})
    //   body:formData
  }).then(response => response);
}

class TodoPage extends Component {
  initialState = {
    currentTodo: {
      id: "",
      title: "",
      description: "",
      status: false
    },
    todorecords: [
      {
        id: 1,
        title: "TestFromPM7",
        description: "Sent from postman",
        status: true
      },
      {
        id: 2,
        title: "Second",
        description: "Second note",
        status: false
      },
      {
        id: 3,
        title: "TestFromPM3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem purus, pretium nec scelerisque et, commodo vitae diam. Cras interdum quam id metus molestie, vitae dignissim tellus vehicula. Donec fringilla enim ac maximus vulputate. Donec ac diam sagittis, malesuada velit eget, tincidunt lectus. Duis at mauris leo. Curabitur ut ligula at felis sollicitudin lobortis sit amet at erat. Curabitur cursus pharetra eros. Morbi malesuada cursus dolor, a malesuada urna. Pellentesque nec erat ut augue vehicula laoreet id at ante. Curabitur pharetra commodo nulla eget consectetur. Aliquam erat volutpat. Integer in eleifend velit. Nunc vulputate feugiat massa consequat scelerisque.",
        status: false
      }
    ],
    openModal: false
  };

  state = this.initialState;

  handleLogout = () => {
    alert("Logout called");
    this.logout();
    window.location.replace(process.env.PUBLIC_URL);
  };

  logout = () => {
    fetch("http://localhost:8000/todoapi/logout/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      // headers: {
      //   'Content-Type': 'application/json'
      "Content-Type": "application/x-www-form-urlencoded"
      // },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *client
      // body:JSON.stringify({"username":username,"password":password})
      // body:""
    }).then(response => {
      let datapromise = response.json();
      console.dir(datapromise);
      if (response.ok) {
        console.log("User Logged Out");
        this.props.userAuthHandler(false);
      }
    });
  };

  handleTodoContentChange = event => {
    const { name, value } = event.target;
    this.setState({
      currentTodo: {
        [name]: value
      }
    });
  };

  handleTodoCardClick = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.dir(event.target);
    // this.setState({
    //     currentTodo:{
    //         id:event.target.parentElement.value,
    //         title: this.state.currentTodo.title,
    //         description: this.state.currentTodo.description,
    //         status: this.state.currentTodo.status,
    //     },
    //     openModal:true,
    // })

    console.log("Retrieveing Specific TODO");
    let response = GetTodoSpecific(event.target.parentElement.value);
    // let datapromise = response.json();
    // console.dir(datapromise);
    console.log("Response Object:");
    console.dir(response);
    if (response.ok) {
      console.log("Data response OK");
      response.json().then(body => {
        console.dir(body.records);
        this.setState({
          currentTodo: {
            id: event.target.parentElement.value,
            title: body.title,
            description: body.description,
            status: body.status
          },
          openModal: true
        });
      });
    } else {
      console.log("Data response NOT OK");
    }
  };

  handleModalClose = () => {
    this.setState({
      openModal: false
    });
  };

  componentDidMount() {
    let retrieveAndSetState = async () => {
      let todoData = GetTodo();
      console.log("TodoData");
      console.dir(todoData);
      if (todoData[0] == true) {
        console.log("Retrieved Data from API success");
        this.setState({
          todorecords: todoData[1]
        });
      } else {
        console.log("Retrieved Data from API failed");
      }
    };

    retrieveAndSetState();
  }
  render() {
    const { classes } = this.props;

    const TodoContent = props => {
      const todos = props.todolist.map((todo, index) => {
        let chip = undefined;
        if (todo.status === true) {
          chip = <Chip label="DONE" className={classes.todoChipDone} />;
        } else {
          chip = <Chip label="TODO" className={classes.todoChipUnfinished} />;
        }
        return (
          <Card className={classes.root} elevation={3} key={index}>
            <CardHeader className={classes.header} title={todo.title} />
            {chip}
            <CardContent className={classes.contentContainer}>
              <Typography
                className={classes.content}
                variant="body1"
                component="p"
              >
                {todo.description}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                size="small"
                name="id"
                value={todo.id}
                onClick={this.handleTodoCardClick}
              >
                View
              </Button>
            </CardActions>
          </Card>
        );
      });
      return <div id="TodoContent">{todos}</div>;
    };

    const TodoModalContent = props => {
      const currTodo = props.currentTodo;
      if (currTodo.id != "") {
        let chip = undefined;
        if (currTodo.status === true) {
          chip = <Chip label="DONE" className={classes.todoChipDone} />;
        } else {
          chip = <Chip label="TODO" className={classes.todoChipUnfinished} />;
        }
        return (
          <div className={classes.paper}>
            <div className={classes.modalContent}>
              <TextField
                type="text"
                id="modaltitle"
                name="title"
                label="Title"
                variant="outlined"
                value={this.state.currentTodo.title}
                InputProps={{ readOnly: true }}
                onChange={this.handleChange}
                fullWidth
              />
              {chip}
              <TextField
                type="text"
                id="modaldescription"
                name="description"
                label="Description"
                variant="outlined"
                value={this.state.currentTodo.title}
                InputProps={{ readOnly: true }}
                onChange={this.handleChange}
                fullWidth
                rowsMax="10"
                multiline
              />
            </div>
            <div className={classes.modalButton}>
              <Button
                variant="contained"
                id="btnModalEdit"
                startIcon={<AddTwoToneIcon />}
              >
                Edit
              </Button>
            </div>
          </div>
        );
      }
    };

    return (
      <div id="TodoPage">
        <header id="TodoHeader">
          <h1>TODOs. Noted.</h1>
          <div>
            <Button
              variant="contained"
              id="btnCreateTodo"
              startIcon={<AddTwoToneIcon />}
            >
              Create
            </Button>
            <Button
              variant="contained"
              id="btnLogout"
              startIcon={<ExitToAppIcon />}
              onClick={this.handleLogout}
            >
              Logout
            </Button>
          </div>
        </header>
        <TodoContent todolist={this.state.todorecords} />
        <Modal open={this.state.openModal} onClose={this.handleModalClose}>
          <TodoModalContent currentTodo={this.state.currentTodo} />
        </Modal>
      </div>
    );
  }
}

export default withStyles(useTodoCardStyles)(TodoPage);
