import React, { Component } from 'react';
import {connect} from 'react-redux';
import GuildLog from './GuildLog';
import GuildTasks from './GuildTasks';
import './SideBar.css';
 
let logWorker = new Worker("../../workers/logWorker.js");

class SideBar extends Component {

  constructor(props) {
    super(props);

    this.displayActivity = this.displayActivity.bind(this);
  }

  componentWillMount(){
    let worker = new logWorker();

    worker.onmessage = function(e){
      this.props.dispatch(actions.getLogEntries(e.data));
    }
  }

  componentWillUnMount(){
    //destroy web worker
  }

  displayActivity(){
    if(currentActivity === 'log'){
      return (<GuildLog />);
    }
    else if(currentActivity === 'tasks'){
      return (<GuildTasks />);
    }
    else{
    }
  }

  render() {
    return (
      <div className="SideBar">
        <div className="SideBar-header">
          <h3>Guild Activities</h3>
        </div>
        <div>
          {this.displayActivity()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    currentActivity: state.activity,
    log: state.log,
    tasks: state.tasks
});

export default connect(mapStateToProps)(SideBar);