import React, { Component} from 'react';
  
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StopIcon from '@mui/icons-material/Stop';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable'; 
import PropTypes  from "prop-types";

import CreateTaskForm from './CreateTaskForm';
  
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default class Header extends Component {
  static propTypes = {
    onCreateTask: PropTypes.func,
    tasks: PropTypes.array,
    taskId: PropTypes.string,
    TaskName: PropTypes.string,
    dialogMaxHeight: PropTypes.number
  }

  constructor (props) {
    super(props)
    this.state = {
      openTaskForm: false,
      createTaskDialogOpen: false,
      monthShortNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    }
  }


  handleOpenTaskForm = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      openTaskForm: true,
      anchorEl: event.currentTarget,
    })    
  };

  handleCloseTaskForm = () => {
    this.setState({
      openTaskForm: false,
    });
  };

  handleOpenCreateTaskDialog = () => {
    this.setState({
      createTaskDialogOpen: true,
      openTaskForm: false
    })
  };

  handleCloseCreateTaskDialog = () => {
    this.setState({
      createTaskDialogOpen: false
    })
  };

  handleCreateTask = (task) => {
    this.props.onCreateTask(task)
    this.handleCloseCreateTaskDialog()
  };

  dateFormat = (d) => {
    var t = new Date(d);
    return t.getDate() + ' ' + this.monthShortNames[t.getMonth()] + ', ' + t.getFullYear();
  };

  render() {
    return (
      <React.Fragment>
        <AppBar position='fixed'sx={{ bgcolor: '#E5E5E5', height:'100vh', width:'100vw'}}  elevation={0}>
          <Toolbar>
            <Typography variant="h5" 
              color="#415C73"
              style={{ fontWeight: 600 }}
              component="div" sx={{ flexGrow: 1 }}>
              Today, {this.dateFormat(new Date())}
            </Typography>   
            <Stack spacing={2} direction="row">
              <Button variant="outlined" color="error" >
                <StopIcon style={{paddingRight:10}}/>
                Stop
              </Button>
              <Button variant="outlined" color="success" onClick={this.handleOpenCreateTaskDialog}>
                <AccessAlarmsIcon style={{paddingRight:10}}/>
                Start new
              </Button>
              <Dialog
                open={this.state.createTaskDialogOpen}
                variant="outlined"
                sx={{ borderRadius: 16 }}
                PaperComponent={PaperComponent}
                PaperProps={{ sx: {maxWidth:'80vh',minWidth:'80vh',minHeight: '80vh', maxHeight: '80vh' , borderRadius: 6 , top:50} }}
                style={{ borderRadius:"30px",height : '400px'}}
                onClose={this.handleCloseCreateTaskDialog}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Create new task"}
                </DialogTitle>
                <DialogContent>
                  <CreateTaskForm onSave={this.handleCreateTask}/>
                </DialogContent>
              </Dialog> 
              
      
            </Stack>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}