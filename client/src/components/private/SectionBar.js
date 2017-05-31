import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

//iconElementLeft={<IconButton><NavigationClose /></IconButton>}

function SectionBar(props){
  return (
    <div className="sectionBar">
      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton>
                            <ContentAdd />
                          </FloatingActionButton>}
      />
    </div>
  );
  //<FlatButton label="Log Out" onClick={props.logOut}/>
}

export default SectionBar; 