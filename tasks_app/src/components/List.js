import React, {Component} from 'react';
import PropTypes  from "prop-types";
import {groupByDay} from '../utils/timeEn';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import Snackbar from '@mui/material/Snackbar';
import ListItem from './ListItem';

export class List extends Component {
  static propTypes = {
    entries: PropTypes.array,
  }
  render() {
    return (
      <Table>
        <TableHead displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHead colSpan="4">{this.props.date}</TableHead>
          </TableRow>
        </TableHead>
        <TableBody displayRowCheckbox={false}>
          {
            this.props.entries.map((timeEntry) => {
              return (
                <ListItem
                  key={timeEntry.key} 
                  text={timeEntry.text} 
                  id={timeEntry.key} 
                  startTime={timeEntry.startTime} 
                  endTime={timeEntry.endTime}
                  tagId={timeEntry.tagId}
                />
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}

export class TimeEntryListContainer extends Component {
  static propTypes = {
    onFetchList: PropTypes.func,
    entries: PropTypes.object,
    removedSuccess: PropTypes.bool
  }

  static defaultProps = {
    entries: {},
    removedSuccess: false
  }
 


  render() {
    const entriesByDay = groupByDay(this.props.entries)
    return(
      <div>
      {
        entriesByDay.map((e) => (
          <List key={e.date} date={e.date} entries={e.entries} />
        ))      
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


export default List