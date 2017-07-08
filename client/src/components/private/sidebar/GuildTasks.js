import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/logAndTasksActions';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import './SideBar.css';

//let logWorker = require("../../workers/logWorker.js");
const listItemsStyle = {

} 

class GuildTasks extends Component {

  constructor(props) {
    super(props);

    this.state={
      taskCreationOpen: false,
      snackBarOpen: false,
      snackBarMessage: "",
      sliderValue: 5,
      taskDescription: "",
      taskErrorText: "",
      taskAddDisabled: true
    };

    this.handleSlider = this.handleSlider.bind(this);
    this.openTask = this.openTask.bind(this);
    this.closeTask = this.closeTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.deleteTasks = this.deleteTasks.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
    this.taskDescriptionModified = this.taskDescriptionModified.bind(this);
  }
  componentDidMount(){
    this.props.dispatch(actions.getTasks(this.props.activeGuild));
  }
  componentWillReceiveProps(nextProps){
    if(this.props.logAndTasksMounted){
      if(this.props.tasks.length < nextProps.tasks.length)
        this.setState({taskCreationOpen: false, snackBarMessage: "Added 1 task to task list", snackBarOpen: true});
      else if((this.props.tasks.length - nextProps.tasks.length) === 1)
        this.setState({snackBarMessage: "Removed 1 task from task list", snackBarOpen: true});
      else if((this.props.tasks.length - nextProps.tasks.length) > 1)
        this.setState({snackBarMessage: "Removed "+(this.props.tasks.length - nextProps.tasks.length)+" tasks from task list", snackBarOpen: true});
    }
    if(this.props.activeGuild !== nextProps.activeGuild){
      nextProps.dispatch(actions.getTasks(nextProps.activeGuild));
    }
  }
  /*componentWillMount(){
    let worker = new logWorker();

    worker.onmessage = function(e){
      this.props.dispatch(actions.getLogEntries(e.data));
    }
  }

  displayActivity(){
    if(currentActivity === 'log'){
      return (<GuildLog />);
    }
    else if(currentActivity === 'tasks'){
      return (<GuildTasks />);
    }
    else{}
  }*/
  compareTasks(taskA, taskB, reverse=false){
    if(reverse){
      if(taskA.importance < taskB.importance)
        return -1;
      else if(taskA.importance > taskB.importance)
        return 1;
      else
        return 0;      
    }
    else{
      if(taskA.importance > taskB.importance)
        return -1;
      else if(taskA.importance < taskB.importance)
        return 1;
      else
        return 0;
    }
  }
  handleSlider(event, value){
    this.setState({sliderValue: value});
  }
  openTask(){
    this.setState({taskCreationOpen: true});
  }
  closeTask(){
    this.setState({taskCreationOpen: false});
  }
  addTask(){
    this.props.dispatch(actions.addTask(this.props.activeGuild, this.state.taskDescription, this.state.sliderValue));
      //.then(() => { this.setState({taskCreationOpen: false}); });
  }
  removeTask(taskID){
    this.props.dispatch(actions.removeTask(this.props.activeGuild, taskID));
  }
  deleteTasks(){
    this.props.dispatch(actions.deleteTasks(this.props.activeGuild));
  }
  closeSnackBar(){
    this.setState({snackBarOpen: false});
  }
  taskDescriptionModified(event){
    let errorText = "";
    let taskAddDisabled;
    if(event.target.value.length === 0){
      if(!this.state.taskAddDisabled)
        taskAddDisabled=true;
      errorText = "This field is required";
    }
    else{
      if(this.state.taskAddDisabled)
        taskAddDisabled = false;
    }
    this.setState({taskDescription: event.target.value, taskErrorText: errorText, taskAddDisabled: taskAddDisabled});
  }

  render() {
    let count = 0;
    const taskListItems = this.props.tasks.sort(this.compareTasks).map(task => {
      let listItemStyle = {borderBottom: '1px solid black'};
      switch(task.importance){
        case 10:
          listItemStyle["backgroundColor"] = '#B00000';
          break;
        case 9:
          listItemStyle["backgroundColor"] = '#B80000';
          break;
        case 8:
          listItemStyle["backgroundColor"] = '#C00000';
          break;
        case 7:
          listItemStyle["backgroundColor"] = '#D00000';
          break;
        case 6:
          listItemStyle["backgroundColor"] = '#D80000';
          break;
        case 5:
          listItemStyle["backgroundColor"] = '#E00000';
          break;
        case 4:
          listItemStyle["backgroundColor"] = '#E80000';
          break;
        case 3:
          listItemStyle["backgroundColor"] = '#F00000';
          break;
        case 2:
          listItemStyle["backgroundColor"] = '#F80000';
          break;
        case 1:
          listItemStyle["backgroundColor"] = '#FF0000';
          break;
        default:
          listItemStyle["backgroundColor"] = '#E00000';
          break;
      }
      return (<ListItem 
        style={listItemStyle}
        open={true}
        primaryText={<div className="listItemText"><div><strong>Importance: {task.importance}</strong></div><br /><div>{task.description}</div></div>}
        key={count++}
        rightIcon={<div><ContentRemove className="listItemIcon" onClick={() => this.removeTask(task._id)} /></div>}
      />);
    });
    //<ContentCreate className="listItemIcon" />
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeTask}
        key={0}
      />,
      <FlatButton
        label="Add"
        primary={true}
        disabled={this.state.taskAddDisabled}
        onTouchTap={this.addTask}
        key={1}
      />,
    ];
    const addTaskHeaderStyle={
      paddingBottom: "0px"
    };
    return (
      <div className="taskManager">
        <Toolbar>
          <ToolbarGroup>
            <IconButton onClick={this.openTask} tooltip="add task" tooltipPosition="bottom-center">
              <ActionNoteAdd />
            </IconButton>
            <Dialog
              title={<div style={addTaskHeaderStyle}>Create new task</div>}
              actions={<div><Divider />{actions}</div>}
              modal={true}
              open={this.state.taskCreationOpen}
            >
              <TextField
                errorText={this.state.taskErrorText}
                floatingLabelText="Task Description"
                fullWidth={true}
                multiLine={true}
                required={true}
                onChange={this.taskDescriptionModified}
              />
              <Slider
                className="slider"
                min={1}
                max={10}
                step={1}
                required={true}
                value={this.state.sliderValue}
                onChange={this.handleSlider}
              />
              <p className="sliderLabel">
                <span>{'Task Importance: '}</span>
                <span>{this.state.sliderValue}</span>
              </p>
            </Dialog>
            <IconButton onClick={this.deleteTasks} tooltip="delete all" tooltipPosition="bottom-center">
              <ContentDeleteSweep />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <List className="taskList">
          {taskListItems}
        </List>
        <Snackbar
          className="snackBar"
          style={{width: '300px'}}
          open={this.state.snackBarOpen}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackBar}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tasks: state.logAndTasks.tasks,
  activeGuild: state.registrationAndLogin.activeGuild,
  logAndTasksMounted: state.logAndTasks.logAndTasksMounted
});

export default connect(mapStateToProps)(GuildTasks);