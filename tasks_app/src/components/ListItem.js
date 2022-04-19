import React, {Component} from 'react';
import PropTypes  from "prop-types";

import {toAmPm} from '../utils/time';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import FontIcon from '@mui/material/FontIcon';
import { Box } from '@mui/system';


class ListItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    tagId: PropTypes.string,
    onCreateTask: PropTypes.func,
    onSelectTask: PropTypes.func
  }

  UNSAFE_componentWillMount() {
    this.setState({
      text: this.props.text
    })   
  }


  handleChangeText = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleCreateTag = (TaskName) => {
    this.props.onCreateTask( this.props.id, TaskName)
  }

  handleSelectTag = (taskId) => {
    this.props.onSelectTask( this.props.id, taskId)
  }

  render() {
    return(
      <TableRow>
        <TableCell>
          <div onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
            <TextField
              id='text'
              name='text'
              value={this.state.text}
              onChange={this.handleChangeText}
              underlineShow={false}
            />
          </div>
        </TableCell>
        <TableCell>
          <div onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
                     
          </div>        
        </TableCell>
        <TableCell>
            <Box>{this.props.startTime }- {this.props.endTime}</Box>
            <Box> {toAmPm(this.props.startTime)} - {toAmPm(this.props.endTime)}</Box>
        </TableCell>
        <TableCell>
          <div onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
            <Button
              icon={<FontIcon className="material-icons" style={{color: 'grey', width: 50, fontSize: 20}}>delete</FontIcon>}
              onClick={this.handleRemove}
            />
          </div>
        </TableCell>
      </TableRow>
    )
  }
}

export default ListItem