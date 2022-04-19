import React, {Component} from 'react';
import PropTypes  from "prop-types";
import Button  from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class CreateTaskForm extends Component {
  static propTypes = {
    onSave: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      taskNameInputError: null,
      TaskName: ''
    }
  }

  handleSave = (event) => {
    event.preventDefault()

    this.setState({
      taskNameInputError: this.state.TaskName ? null : "Task name is required"
    })
    const task = this.state.TaskName
    if (task) {
      this.props.onSave(task)
    }
  }

  handleChange = (e) => {
    this.setState({
      tagName: e.target.value
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSave}>
        <TextField
          hintText="Task name"
          id="tag-name"
          errorText={this.state.taskNameInputError}
          value={this.state.TaskName}
          onChange={this.handleChange}
        />
      
        <br/>
        <Button
          variant="contained" color="success"
          fullWidth={true}
          label="Create task"
          labelStyle={{textTransform: 'none'}}
          onClick={() => this.handleSave} 
        />
      </form>
    )
  }
}

export default CreateTaskForm