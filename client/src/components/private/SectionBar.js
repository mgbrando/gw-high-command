import React from 'react';
import AppBar from 'material-ui/AppBar';
import './SectionBar.css';

function SectionBar(props){
    return (
    <div className={"sectionBar "+(props.additionalClasses || '')}>
      <AppBar
        className="appBar"
        title={<span className="title">{props.title}</span>}
        iconElementLeft={<div className="leftIcon">{props.leftIcon || ''}</div>}
        iconElementRight={<div className="rightIcon">{props.rightIcon || ''}</div>}
      />
    </div>
  );
}

export default SectionBar; 