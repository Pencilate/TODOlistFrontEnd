import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
    height: "60%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "20%",
    left: "20%",
    display: "block",
    overflow: "auto",
  },
  modalContent: {
    height: "90%"
  },
  modalButton: {
    height: "10%"
  },
  modalTextFields:{
      margin: '0.5em'
  }

});

class TodoPage extends Component {
  initialState = {
    curid: undefined,
    curtitle: undefined,
    curdescription: undefined,
    curstatus: false,
    todorecords: [
      {
        id: 1,
        title: "TestInitialTodo",
        description: "InitialTODO",
        status: true
      },
    ],
    openModal: false,
    editMode: false
  };

  state = this.initialState;

  handleLogout = () => {
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

  getTodo = () => {
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
        console.log("Retrieved All TODOs");
        datapromise.then(body => {
          console.dir(body.records);
          this.setState({
              todorecords: body.records
          })
        });
      } else {
        console.log("Unable to retrieve all TODOs");
      }
    });
  };

  getTodoSpecific = (todoId) => {
    fetch("http://localhost:8000/todoapi/todos/"+todoId, {
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
        console.log("Retrieved Specifc TODOs");
        datapromise.then(body => {
            console.dir(body)
            this.setState({
              curid: body.id,
              curtitle: body.title,
              curdescription: body.description,
              curstatus: body.status,
            });
        });
      } else {
        console.log("Unable to retrieve specific TODOs");
      }
    });
  };

  deleteTodoSpecific = (todoId) => {
    fetch("http://localhost:8000/todoapi/todos/"+todoId, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
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
        console.log("Deleted Specifc TODOs");
        this.getTodo();
      } else {
        console.log("Unable to delete specific TODOs");
      }
    });
  };

  handleTodoContentChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
  };

  handleTodoCardClick = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.dir(event.target);
    this.getTodoSpecific(event.target.parentElement.value);
    this.handleOpenModal();

  };

  handleOpenModal = () =>{
    this.setState({
        openModal:true,
    })
  }

  handleModalClose = () => {
    this.setState({
        curid: undefined,
        curtitle: undefined,
        curdescription: undefined,
        curstatus: false,
        openModal: false
    });
  };

  handleTodoDelete = () => {
      this.deleteTodoSpecific(this.state.currentTodo.id);
      this.handleModalClose();
  }

  componentDidMount(){
    this.getTodo()
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
      const todoState = props.todoState;
      if (todoState.curid == undefined) {
        return (
            <div className={classes.paper}>
              <div className={classes.modalContent}>
              <p>Create Mode</p>
                <TextField
                  className={classes.modalTextFields}
                  type="text"
                  id="modaltitle"
                  name="curtitle"
                  label="Title"
                  variant="outlined"
                  value={todoState.curtitle}
                  onChange={this.handleTodoContentChange}
                  fullWidth
                />
                <TextField
                  className={classes.modalTextFields}
                  type="text"
                  id="modaldescription"
                  name="curdescription"
                  label="Description"
                  variant="outlined"
                  value={todoState.curdescription}
                  onChange={this.handleTodoContentChange}
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
                  Create
                </Button>
                <Button
                  color="#DB4F39"
                  variant="contained"
                  id="btnModalClose"
                  onClick={this.handleModalClose}
                  startIcon={<CloseIcon />}
                >
                  Close
                </Button>
              </div>
            </div>
          );
      }
      else{
        let chip = undefined;
        if (todoState.curstatus === true) {
          chip = <Chip label="DONE" className={classes.todoChipDone} />;
        } else {
          chip = <Chip label="TODO" className={classes.todoChipUnfinished} />;
        }
        return (
          <div className={classes.paper}>
            <div className={classes.modalContent}>
            <p>Edit/View Mode</p>
              <TextField
                type="text"
                id="modaltitle"
                name="curtitle"
                label="Title"
                variant="outlined"
                value={todoState.curtitle}
                InputProps={{ readOnly: true }}
                onChange={this.handleTodoContentChange}
                fullWidth
              />
              {chip}
              <TextField
                type="text"
                id="modaldescription"
                name="curdescription"
                label="Description"
                variant="outlined"
                value={todoState.curdescription}
                InputProps={{ readOnly: true }}
                onChange={this.handleTodoContentChange}
                fullWidth
                rowsMax="10"
                multiline
              />
            </div>
            <div className={classes.modalButton}>
              <Button
                variant="contained"
                id="btnModalDelete"
                startIcon={<DeleteForeverIcon />}
                onClick={this.handleTodoDelete}
              >
              Delete
              </Button>
              <Button
                variant="contained"
                id="btnModalEdit"
                startIcon={<AddTwoToneIcon />}
              >
                Edit
              </Button>
              <Button
                  color="#DB4F39"
                  variant="contained"
                  id="btnModalClose"
                  onClick={this.handleModalClose}
                  startIcon={<CloseIcon />}
                >
                  Close
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
              onClick={this.handleOpenModal}
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
          <TodoModalContent todoState={this.state} />
        </Modal>
      </div>
    );
  }
}

export default withStyles(useTodoCardStyles)(TodoPage);
