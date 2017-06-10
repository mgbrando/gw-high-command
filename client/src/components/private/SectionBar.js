import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
//iconElementLeft={<IconButton><NavigationClose /></IconButton>}
import './SectionBar.css';

function SectionBar(props){
    return (
    <div className={"sectionBar "+(props.additionalClasses || '')}>
      <AppBar
        className="appBar"
        title={<span className="title">{props.title}</span>}
        iconElementLeft={<div className="leftIcon">{props.leftIcon || ''}</div>}
      />
    </div>
  );
  /*if(props.expanded === true){
  return (
    <div className="sectionBar">
      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<NavigationExpandLess className="expandIcon" />}
      />
    </div>
  );
  }
  else{
  return (
    <div className="sectionBar">
      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<NavigationExpandMore className="expandIcon" />}
      />
    </div>
  );  
  }*/
  //<FlatButton label="Log Out" onClick={props.logOut}/>
}

export default SectionBar; 