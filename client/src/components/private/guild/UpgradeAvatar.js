import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
//import placeholder from '../../assets/dragon-head.png';
import './Guild.css';

class UpgradeAvatar extends Component {

  constructor(props) {
    super(props);

    this.state={
    	loaded: false
    };

    this.loadImage = this.loadedImage.bind(this);
  }

  loadImage(){
  	this.setState({loaded: true});
  }

  render(){
  	if(this.state.loaded){
  		return (<Avatar src={this.props.upgradeImage} />);
  	}
  	else{
  		return (<Avatar icon={this.props.placeholder}/>);
  	}
  }
}

export default UpgradeAvatar;