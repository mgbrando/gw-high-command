import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
//import './RankSelection.css';

class AboutDialog extends Component {

  constructor(props) {
    super(props);

    this.state ={
      open: false
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <RaisedButton label="About" onTouchTap={this.handleOpen} />
        <Dialog
          title="GW2 High Command"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div className="dialogContent">
            <div>GW2 High Command is an app for Guild Wars 2 guild leaders in mind. Leaders can register 
            themselves with this app along with the guidl they are the leader of. After this, guild members 
            should be directed by the guild leader to submit an API KEY to the registered guild. This app 
            gives leaders out-of-game access to the following:
            <List>
              <ListItem 
                primaryText="Guild Status and Upgrades"
                disabled={true}
              />
              <ListItem 
                primaryText="Guild members details and statistics"
                disabled={true}
              />
              <ListItem 
                primaryText="Guild teams composition, statistics and recent matches"
                disabled={true}
              />
              <ListItem 
                primaryText="Live guild log"
                disabled={true}
              />
              <ListItem 
                primaryText="Task list by importance"
                disabled={true}
              />
            </List>
            </div>
            <div>
              For a demo of this app select the Guild Leader button on the main page and enter the credentials 
              on the bottom of the login page.
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AboutDialog;