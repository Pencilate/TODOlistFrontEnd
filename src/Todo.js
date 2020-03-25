
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
      minWidth: 300,
      minHeight: 300,
      maxWidth: 300,
      maxHeight: 300,
      position:'relative',
      margin: '2em'
    },
    header: {
        paddingBottom:0,

        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-box-orient':'vertical',
        '-webkit-line-clamp':1
    },
    todoChipUnfinished: {
        margin: '0 1em',
        backgroundColor: '#EBAF26',
    },  
    todoChipDone: {
        margin: '0 1em',
        backgroundColor: '#8B8B8C',
    },
    actions:{
        position:'absolute',
        bottom:0
    },
    content:{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-box-orient':'vertical',
        '-webkit-line-clamp':6
    }

});


class TodoPage extends Component{

    render(){
        const { classes } = this.props;
        return (
            <div id="TodoPage">
                <header id="TodoHeader">
                
                    <h1>TODOs. Noted.</h1>
                    <div>
                        <Button variant="contained" id="btnCreateTodo" startIcon={<AddTwoToneIcon/>}>Create</Button>
                        <Button variant="contained" id="btnLogout" startIcon={<ExitToAppIcon/>}>Logout</Button>
                    </div>
                </header>
                {/* <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                        TODOs. Noted.
                        </Typography>
                        <Button variant="contained" id="btnCreateTodo" startIcon={<AddTwoToneIcon/>}>Create</Button>
                        <Button variant="contained" id="btnLogout" startIcon={<ExitToAppIcon/>}>Logout</Button>
                    </Toolbar>
                </AppBar> */}
                <div id="TodoContent">
                <Card className={classes.root} elevation={3} >
                    <CardHeader className={classes.header} title="This is a title this is agoing to be a long title header" />
                    <Chip label="TODO" className={classes.todoChipUnfinished}/>
                    <CardContent>
                        <Typography className={classes.content} variant="body1" component="p">
                            TodoNote Content
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem purus, pretium nec scelerisque et, commodo vitae diam. Cras interdum quam id metus molestie, vitae dignissim tellus vehicula. Donec fringilla enim ac maximus vulputate. Donec ac diam sagittis, malesuada velit eget, tincidunt lectus. Duis at mauris leo. Curabitur ut ligula at felis sollicitudin lobortis sit amet at erat. Curabitur cursus pharetra eros. Morbi malesuada cursus dolor, a malesuada urna. Pellentesque nec erat ut augue vehicula laoreet id at ante. Curabitur pharetra commodo nulla eget consectetur. Aliquam erat volutpat. Integer in eleifend velit. Nunc vulputate feugiat massa consequat scelerisque.
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button size="small" value="">View</Button>
                    </CardActions>
                </Card>

                <Card className={classes.root} elevation={3} >
                    <CardHeader className={classes.header} title="This is a title this is agoing to be a long title header" />
                    <Chip label="DONE" className={classes.todoChipDone}/>
                    <CardContent>
                        <Typography className={classes.content} variant="body1" component="p">
                            TodoNote Content
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem purus, pretium nec scelerisque et, commodo vitae diam. Cras interdum quam id metus molestie, vitae dignissim tellus vehicula. Donec fringilla enim ac maximus vulputate. Donec ac diam sagittis, malesuada velit eget, tincidunt lectus. Duis at mauris leo. Curabitur ut ligula at felis sollicitudin lobortis sit amet at erat. Curabitur cursus pharetra eros. Morbi malesuada cursus dolor, a malesuada urna. Pellentesque nec erat ut augue vehicula laoreet id at ante. Curabitur pharetra commodo nulla eget consectetur. Aliquam erat volutpat. Integer in eleifend velit. Nunc vulputate feugiat massa consequat scelerisque.
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button size="small" value="">View</Button>
                    </CardActions>
                </Card>
                </div>
            </div>
        );
    }
  }

  export default withStyles(useStyles)(TodoPage)