import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/registrationAndLoginActions';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import 'typeface-roboto';
import './RankSelection.css';


class GuildList extends Component {
	constructor(props) {
    	super(props);
    	//remember you have the method getPage as a prop
    	for(let i = 0; i < props.guildIds.length; i++){
    		props.dispatch(actions.getGuilds(props.guildIds[i]));
    	}
    	/*if(isLeader)
    		this.props.dispatch(getGuildListSetup('leader'));
    	else
    		this.props.dispatch(getGuildListSetup('member'));*/
    	this.toggleGuild = this.toggleGuild.bind(this);
    	this.addMemberToGuilds = this.addMemberToGuilds.bind(this);
    	this.createGuildsAndAddLeader = this.createGuildsAndAddLeader.bind(this);
  	}
  	toggleGuild(event){
  		event.stopPropagation();
  		console.log('Touch Tap!');
  		//if(this.props.selectedGuilds)
  		/*if(this.props.selectedMemberGuilds.indexOf(event.target.value) > -1)
  			this.props.dispatch(actions.deselectGuild(this.props.selectedMemberGuilds, event.target.value));
  		else
  			this.props.dispatch(actions.selectGuild(this.props.selectedMemberGuilds, event.target.value));*/
  		//const selectedGuilds = this.props.selectedGuilds;
  	/*	for(let i=0; i < this.props.selectedGuilds.length; i++){
      		if(selectedGuilds[i].guildId === event.target.value){
        		this.props.selectedGuilds.splice(i, 1);

        	if(selectedGuilds.length === 0)
          		return dispatch(changeSelectedGuilds(selectedGuilds, true));
       		 else
          		return dispatch(changeSelectedGuilds(selectedGuilds, false));
        	break;
      	}
    }
  		const guild = JSON.parse(event.target.value);
  		if(event.target.checked){

  			this.props.dispatch(actions.selectGuild(this.props.selectedMemberGuilds));
  		}
  		else
  			this.props.dispatch(actions.deselectGuild(this.props.selectedMemberGuilds, event.target.value));*/
  		this.props.dispatch(actions.toggleGuild(this.props.selectedMemberGuilds, this.props.guilds, event.target.value));
  	//	this.props.dispatch(actions.addToSelectedGuilds(event.target.value));
  	}
  	addMemberToGuilds(apiKey, guilds){
    	//Action to add a member to the guild and then do the below
    	//this.props.getPage('rankSelection'); 
    	/*rankSelection will need to have
    	a message of member being successfully added to a guild or guilds */
    	this.props.dispatch(actions.addMemberToGuilds(apiKey, guilds));
  	}
  	createGuildsAndAddLeader(apiKey, guilds){
  		this.props.dispatch(actions.addAddLeaderAndCreateGuilds(apiKey, guilds));
  	}
  	/*componentDidMount(){
  		this.props.dispatch(actions.getGuilds(props.guildIds));
  	}*/
/*export default function GuildList(props){
	let guilds = [];
	for(let i = 0; i < props.guilds.length; i++){
		guilds.push(<ListItem key={i} primaryText={props.guilds.name} leftCheckbox={<Checkbox />}/>); //onCheck={}
	}
	return (
		<div className="guildListContainer">
			<h2>{props.title}</h2>
			<List className="guildList">
				<Subheader>Select guilds before moving on to link your API Key</Subheader>
				{guilds}
			</List>
		</div>
	);
}*/

	render(){
		let guilds = [];
		for(let i = 0; i < this.props.guilds.length; i++){
			guilds.push(<ListItem className="guildChoice" innerDivStyle={{paddingLeft: 40}} key={i} primaryText={this.props.guilds[i].guildName+' ['+this.props.guilds[i].guildTag+']'} leftCheckbox={<Checkbox className="guildCheckBox" onClick={this.toggleGuild} value={this.props.guilds[i].guildId}/>} />); //onCheck={}
		}
		if(this.props.isLeader){
			return (
				<div className="guildListContainer">
					<List className="guildList">
						<Subheader>Select guilds to create for this application</Subheader>
						{guilds}
					</List>
				</div>
			);
		}
		else{
			return (
				<div className="guildListContainer">
					<List className="guildList">
						<Subheader>Select guilds before moving on to link your API Key</Subheader>
						{guilds}
					</List>
				</div>
			);
		}
	}
}
const mapStateToProps = (state, props) => ({
    //isValidMember: state.isValidMember,
    isLeader: state.registrationAndLogin.isLeader,
    guilds: state.registrationAndLogin.guilds,
    memberName: state.registrationAndLogin.memberName,
    memberApiKey: state.registrationAndLogin.memberApiKey,
    selectedMemberGuilds: state.registrationAndLogin.selectedMemberGuilds
});

export default connect(mapStateToProps)(GuildList);