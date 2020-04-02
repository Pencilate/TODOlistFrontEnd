import React, { Component } from "react";
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import {logout, setTODO, setCurrentTODO,createTODO, updateTODO,deleteTODO} from './actions.js'


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
    margin: "0.5em 0 0 1em",
    backgroundColor: "#EBAF26",
    color: "#FFFFFF"
  },
  todoChipDone: {
    margin: "0.5em 0 0 1em",
    backgroundColor: "#8B8B8C",
    color: "#FFFFFF"
  },
  todoChipUnfinishedModal: {
    backgroundColor: "#EBAF26",
    color: "#FFFFFF"
  },
  todoChipDoneModal: {
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
    overflow: "visible"
  },
  modalContentContainer: {
    height: "90%"
  },
  modalContent: {
    margin: "0.5em 0"
  },
  modalButtonContainer: {
    height: "10%"
  },
  generalButton: {
    backgroundColor: "#303030",
    color: "#FFFFFF"
  },
  modalTextFields: {
    margin: "0.5em"
  },
  fullcontent: {
    height: '70%',
    overflow: 'auto'
  }
});

class TodoPage extends Component {
  initialState = {
    editMode: "",
    openModal: "",
  };

  state = this.initialState;

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
        this.props.userAuthHandler();
        this.props.enqueueSnackbar('Successful Logout',{ variant: 'success', })
      }
    });
  }

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
          this.props.updateEntireTodoList(body.records);

        });
      } else {
        console.log("Unable to retrieve all TODOs");
        this.props.enqueueSnackbar('Unable to retrieve all TODOs',{ variant: 'error', })
      
      }
    });
  };

  getTodoSpecific = todoId => {
    fetch("http://localhost:8000/todoapi/todos/" + todoId, {
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
          console.dir(body);
          this.props.setCurrentTodo(body.id,body.title,body.description,body.status)
        });
      } else {
        console.log("Unable to retrieve specific TODOs");
        this.props.enqueueSnackbar('Unable to retrieve specific TODOs',{ variant: 'error', })
      }
    });
  };

  postTodo = (title,description) => {
    var formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    console.dir(formData);
    fetch("http://localhost:8000/todoapi/todos/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      // headers: {
      //   'Content-Type': 'application/json'
      "Content-Type": "application/x-www-form-urlencoded",
      // },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *client
      // body:JSON.stringify({"username":username,"password":password})
      body:formData
    }).then(response => {
      let datapromise = response.json();
      console.dir(datapromise);
      if (response.ok) {
        console.log("TODO Created");
        this.props.enqueueSnackbar('Successfully Created TODO',{ variant: 'success', })
        datapromise.then(body => {
          console.dir(body);
          this.props.createTodo(body.id,body.title,body.description,body.status);

        });
      }
      else{
        console.log("Unable to create TODOs");
        this.props.enqueueSnackbar('Unable to create TODOs',{ variant: 'error', })
      }
    });
  };

  putTodo = (todoId,title,description,status) => {
    var formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if(status){
      formData.append("status","True")
    }
    else{
      formData.append("status","False")
    }
    console.dir(formData);
    fetch("http://localhost:8000/todoapi/todos/"+todoId, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      // headers: {
      //   'Content-Type': 'application/json'
      "Content-Type": "application/x-www-form-urlencoded",
      // },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *client
      // body:JSON.stringify({"username":username,"password":password})
      body:formData
    }).then(response => {
      let datapromise = response.json();
      console.dir(datapromise);
      if (response.ok) {
        console.log("TODO Updated");
        this.props.enqueueSnackbar('Successfully Updated TODO',{ variant: 'success', })
        datapromise.then(body => {
          console.dir(body);
          let tempStatus = (body.status == "True" ? true : false)
          this.props.updateTodo(body.id,body.title,body.description, tempStatus)
        });
      }
      else{
        console.log("Unable to update specific TODOs");
        this.props.enqueueSnackbar('Unable to update specific TODOs',{ variant: 'error', })

      }
    });
  };

  deleteTodoSpecific = todoId => {
    fetch("http://localhost:8000/todoapi/todos/" + todoId, {
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
        this.props.enqueueSnackbar('Successfully Deleted TODO',{ variant: 'success', })
        // this.getTodo();
        this.props.deleteTodo(todoId)
      } else {
        console.log("Unable to delete specific TODOs");
        this.props.enqueueSnackbar('Unable to delete specific TODOs',{ variant: 'error', })

      }
    });
  };

  handleTodoContentChange = event => {
    const { name, value } = event.target;
    switch(name){
      case 'curtitle':
        this.props.setCurrentTodo(this.props.curid,value,this.props.curdescription,this.props.curstatus);
        break;
      case 'curdescription':
        this.props.setCurrentTodo(this.props.curid,this.props.curtitle,value,this.props.curstatus);
        break;
    }
  };

  handleTodoToggleBtnGroupChange = (event, statusValue) => {
    console.log("Changed Status to "+statusValue)
    if (statusValue !== null) {
      this.props.setCurrentTodo(this.props.curid,this.props.curtitle,this.props.curdescription,statusValue);
    }
  };

  handleTodoCardClick = event => {
    event.preventDefault();
    const { name, value } = event.target;
    console.dir(event)
    console.dir(event.target);
    this.getTodoSpecific(event.target.parentElement.value);
    this.setState({
      openModal: true,
    })
  };

  handleModalClose = () => {
    this.props.setCurrentTodo(undefined,undefined,undefined,false);
    this.setState({
      openModal: false,
      editMode: false,
    })
  };

  handleModalEditCancel = () => {
    this.getTodoSpecific(this.props.curid);
    this.setState({
      editMode: false,
    })
  }

  handleTodoCreate = () => {
    this.postTodo(this.props.curtitle,this.props.curdescription);
    this.handleModalClose();
  }
  
  handleTodoUpdate = () => {
    this.putTodo(this.props.curid,this.props.curtitle,this.props.curdescription,this.props.curstatus)
    this.handleModalClose();
  }

  handleTodoDelete = () => {
    this.deleteTodoSpecific(this.props.curid);
    this.handleModalClose();
  };

  componentDidMount() {
    this.getTodo();
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
                startIcon={<VisibilityIcon/>}
              >
                View
              </Button>
            </CardActions>
          </Card>
        );
      });
      return <div id="TodoContent">{todos}</div>;
    };

    const TodoModalContentMain = props => {
      const todoState = props.todoState;
      if (todoState.editMode === true) {
        //Create/Edit
        if (todoState.curid === undefined) {
          //Create
          return (
            <div className={classes.modalContentContainer}>
              <TextField
                className={classes.modalContent}
                type="text"
                id="modaltitle"
                name="curtitle"
                label="Title"
                variant="outlined"
                defaultValue={todoState.curtitle}
                onBlur={this.handleTodoContentChange}
                fullWidth
              />
              <TextField
                className={classes.modalContent}
                type="text"
                id="modaldescription"
                name="curdescription"
                label="Description"
                variant="outlined"
                defaultValue={todoState.curdescription}
                onBlur={this.handleTodoContentChange}
                fullWidth
                rowsMax="10"
                multiline
              />
            </div>
          );
        } else {
          //Edit
          return (
            <div className={classes.modalContentContainer}>
              <TextField
                className={classes.modalContent}
                type="text"
                id="modaltitle"
                name="curtitle"
                label="Title"
                variant="outlined"
                defaultValue={todoState.curtitle}
                onBlur={this.handleTodoContentChange}
                fullWidth
              />
              <ToggleButtonGroup
                value={todoState.curstatus}
                exclusive
                onChange={this.handleTodoToggleBtnGroupChange}
              >
                <ToggleButton value={false}>TODO</ToggleButton>
                <ToggleButton value={true}>DONE</ToggleButton>
              </ToggleButtonGroup>
              <TextField
                className={classes.modalContent}
                type="text"
                id="modaldescription"
                name="curdescription"
                label="Description"
                variant="outlined"
                defaultValue={todoState.curdescription}
                onBlur={this.handleTodoContentChange}
                fullWidth
                rowsMax="10"
                multiline
              />
            </div>
          );
        }
      } else {
        //View
        let chip = undefined;
        if (todoState.curstatus === true) {
          chip = <Chip label="DONE" className={classes.todoChipDoneModal} />;
        } else {
          chip = (
            <Chip label="TODO" className={classes.todoChipUnfinishedModal} />
          );
        }

        return (
          <div className={classes.modalContentContainer}>
            <h2>{todoState.curtitle}</h2>
            {chip}
            <Typography
              className={classes.fullcontent}
              variant="body1"
              component="p"
            >
              {todoState.curdescription}
            </Typography>
          </div>
        );
      }
    };

    const TodoModalContentButton = props => {
      const todoState = props.todoState;
      if (todoState.editMode === true && todoState.curid === undefined) {
        //Create
        return (
          <div className={classes.modalButtonContainer}>
            <Button
              className={classes.generalButton}
              variant="contained"
              id="btnModalClose"
              onClick={this.handleModalClose}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Button
              className={classes.generalButton}
              variant="contained"
              id="btnModalCreate"
              onClick={this.handleTodoCreate}
              startIcon={<AddTwoToneIcon />}
            >
              Create
            </Button>
          </div>
        );
      } else if (todoState.editMode === true && todoState.curid !== undefined) {
        //Edit
        return (
          <div className={classes.modalButtonContainer}>
            <Button
              className={classes.generalButton}
              variant="contained"
              id="btnModalClose"
              onClick={this.handleModalEditCancel}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Button
              className={classes.generalButton}
              variant="contained"
              id="btnModalUpdate"
              onClick={this.handleTodoUpdate}
              startIcon={<SaveIcon />}
            >
              Update
            </Button>
          </div>
        );
      } else {
        //View
        return (
          <div className={classes.modalButtonContainer}>
            <Button
              className={classes.generalButton}
              variant="contained"
              id="btnModalDelete"
              startIcon={<DeleteForeverIcon />}
              onClick={this.handleTodoDelete}
            >
              Delete
            </Button>
            <Button
              className={classes.generalButton}
              variant="contained"
              id="btnModalClose"
              onClick={this.handleModalClose}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <Button
              className={classes.generalButton}
              variant="contained"
              id="btnModalEdit"
              onClick={()=> {this.setState({editMode:true})}}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
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
              className={classes.generalButton}
              variant="contained"
              id="btnCreateTodo"
              startIcon={<AddTwoToneIcon />}
              onClick={()=>{
                this.setState({
                  openModal: true,
                  editMode: true,
                })
              }}
            >
              Create
            </Button>
            <Button
              className={classes.generalButton}
              variant="contained"
              id="btnLogout"
              startIcon={<ExitToAppIcon />}
              onClick={this.logout}
            >
              Logout
            </Button>
          </div>
        </header>
        <TodoContent todolist={this.props.todorecords} />
        <Modal open={this.state.openModal} onClose={this.handleModalClose}>
          <div className={classes.paper}>
            <TodoModalContentMain todoState={{curid:this.props.curid,curtitle:this.props.curtitle,curdescription:this.props.curdescription,curstatus:this.props.curstatus,editMode:this.state.editMode}} />
            <TodoModalContentButton todoState={{curid:this.props.curid,curtitle:this.props.curtitle,curdescription:this.props.curdescription,curstatus:this.props.curstatus,editMode:this.state.editMode}} />
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    curid: store.todos.curid,
    curtitle: store.todos.curtitle,
    curdescription: store.todos.curdescription,
    curstatus: store.todos.curstatus,
    todorecords: store.todos.todorecords,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userAuthHandler: () => {
      dispatch(logout())
    },
    // setModalEditable: (bool) => {
    //   dispatch(setModalEditable(bool))
    // },
    updateEntireTodoList: (todoArray) => {
      dispatch(setTODO(todoArray))
    },
    setCurrentTodo:(id,title,description,status) =>{
      dispatch(setCurrentTODO(id,title,description,status))
    },
    createTodo:(id,title,description,status) =>{
      dispatch(createTODO(id,title,description,status))
    },
    updateTodo:(id,title,description,status) => {
      dispatch(updateTODO(id,title,description,status))
    },
    deleteTodo:(id)=>{
      dispatch(deleteTODO(id))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useTodoCardStyles)(withSnackbar(TodoPage)));
