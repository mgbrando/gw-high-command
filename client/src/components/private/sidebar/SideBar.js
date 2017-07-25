import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import GuildLog from './GuildLog';
import GuildTasks from './GuildTasks';
import './SideBar.css';

function SideBar(props) {

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
}

export default SideBar;