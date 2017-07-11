import React, { Component } from 'react';
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import GuildLog from './GuildLog';
import GuildTasks from './GuildTasks';
import './SideBar.css';
 
//let logWorker = new Worker("../../workers/logWorker.js");

function SideBar(props) {

  /*constructor(props) {
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
  }*/

  //render() {
    let sideBarContent;
    if(props.title.toLowerCase() === 'tasks')
      sideBarContent = (<GuildTasks />);
    else{
      sideBarContent = (<GuildLog />);
    }

    return (
      <div className="sideBar">
        <Drawer width={300} openSecondary={true} open={props.open}>
          <AppBar
            title={props.title}
            iconElementLeft={        
              <IconMenu
                iconButtonElement={<IconButton><NavigationArrowDropDown /></IconButton>}
                onChange={props.handleChangeSingle}
                value={props.title}
              >
                <MenuItem value="Log" primaryText="Guild Log" key={0} />
                <MenuItem value="Tasks" primaryText="Task Manager" key={1} />
              </IconMenu>
            }
            iconElementRight={
              <NavigationChevronRight className="closeSidePanelChevron" onClick={props.togglePanel} />
            }
          />
          {sideBarContent}
        </Drawer>
      </div>
    );
  //}
}

export default SideBar;