import React, {Component } from 'react';
import PropTypes  from "prop-types";

import {getTimeDuration, toAmPm} from '../utils/time';

import AddTagButtonContainer from './AddTagButtonContainer';
import Button  from '@mui/material/Button';
import FontIcon from '@mui/material/FontIcon';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import {ajoutTask} from '../../store/actions/ajoutTask';

export class TimeEn extends Component {
  static propTypes = {
    text: PropTypes.string,
    duration: PropTypes.string,
    taskId: PropTypes.string,
    onChangeText: PropTypes.func,    
    onOpenDialog: PropTypes.func,
    onStop: PropTypes.func,
    onRemove: PropTypes.func,
    onStart: PropTypes.func,
    onCreateTask: PropTypes.func,
    onSelectTask: PropTypes.func,
    removedSuccess: PropTypes.bool,
  }

  static defaultProps = {
    text: '',//having default value so the input is controlled element
    isFetching: false,
    removedSuccess: false
  }

  constructor (props) {
    super(props)

    const startTime = props.heure_debut ? new Date(props.heure_debut) : null
    const startTimeAmPm = props.heure_debut ? toAmPm(heure_debut) : null

    this.state = {
      startTime: startTime,
      startTimeAmPm: startTimeAmPm,
      duration: null,      
      text: props.text ? props.text : '',
      timerId: null,
      tagId: props.tagId ? props.tagId : null,
      changeTextSubmitTimeoutId: null
    }

  }
  
  const handleAjout = () => {
    dispatch(ajoutTask(TaskName, stop, heure_debut, heure_fin))
  };
  
  componentWillMount() {
    this.startTicking()
  }

  componentWillUnmount() {
    this.stopTicking()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.startTime) {
      const startTime =  new Date(nextProps.startTime)
      const startTimeAmPm = toAmPm(startTime)
      let nextState = {
        startTime: startTime,
        startTimeAmPm: startTimeAmPm
      }
      if (nextProps.text) {
        nextState.text = nextProps.text
      }
      this.setState(nextState, function(){
        this.stopTicking()
        this.startTicking()
      })
    } else {
      this.stopTicking()
      this.setState({
        text: '',
        startTime: null,
        duration: null
      })
    }
    if ('taskId' in nextProps) {
      this.setState({
        taskId: nextProps.taskId
      })
    }
  }

  stopTicking = () => {
    //clear previous timer if any
    if (this.state.timerId) {
      clearInterval(this.state.timerId)
      this.setState({timerId: null})
    }
  }

  startTicking = () => {
    if (this.state.startTime) {
      const updateDuration = () => {
        const now = new Date()        
        this.setState({
          duration: getTimeDuration(this.state.startTime, now)
        })
      }

      updateDuration()
      //setup new timer to show duration
      let timerId = setInterval(()=>{
        updateDuration()
      }, 1000)

      this.setState({
        timerId: timerId
      })      
    }    
  }

  handleChangeText = (e) => {    
    const text = e.target.value
    this.setState({
      text: text
    })

    if (this.state.startTime) {
      if (this.state.changeTextSubmitTimeoutId) {
        clearTimeout(this.state.changeTextSubmitTimeoutId)
      }

      const timeout = setTimeout(() => {
        this.props.onChangeText(this.state.text)    
      }, 1000)
      this.setState({
        changeTextSubmitTimeoutId: timeout
      })
      
    }
  }

  //Enter then start tracking
  handleKeyPress = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      if (this.state.startTime) {
        return
      }

      if (this.state.text !== '') {
        this.props.onStart(this.state.text)
      }
    }
  }

  handleStart = (e) => {
    e.preventDefault()
    this.props.onStart(this.state.text, this.state.tagId)
  }

  handleSelectTag = (tagId) => {
    if (this.props.startTime) {
      this.props.onSelectTag(tagId)
    } else {
      this.setState({tagId})
    }    
  }

  render() {
    return (
      <div className="time-entry-input-form">
        <span 
          onClick={this.props.onOpenDialog}
          style={{
            marginLeft: 20,
            minWidth: 56,
            display: 'inline-block'
          }}
        >
          {this.state.duration ? this.state.duration : '0:00:00'}
        </span>
        { this.state.duration && <Button
            name='btn-stop'
            icon={<FontIcon className="material-icons" style={{color: red500, width: 50, fontSize: 30}}>stop</FontIcon>}
            style={{
              marginLeft: 20,
              minWidth: 50
            }}
            buttonStyle={{
              width: 50
            }}
            onClick={this.props.onStop}
          />
        }

        { this.state.duration && <Button 
            name='btn-remove'
            icon={<FontIcon className="material-icons" style={{color: 'grey', width: 50, fontSize: 20}}>delete</FontIcon>}
            style={{
              marginLeft: 20,
              minWidth: 50
            }}
            onClick={this.props.onRemove}
          />
        }

        { !this.state.duration && <FlatButton 
            icon={<FontIcon className="material-icons" style={{color: 'green', width: 50, fontSize: 30}}>play_arrow</FontIcon>}
            style={{
              marginLeft: 20,
              minWidth: 50
            }}
            onClick={this.handleStart}
          />
        }
        {
          this.props.isFetching
          ?
          <LinearProgress mode="indeterminate" style={{height: 2}} />
          :
          <LinearProgress mode="determinate" max={100} min={100} style={{height: 2}} />
        }
        <Snackbar
          open={this.props.removedSuccess}
          message="The time entry was deleted"
          autoHideDuration={4000}
        />
      </div> 
    )
  }
}

export default TimeEn