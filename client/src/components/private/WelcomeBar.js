import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionList from 'material-ui/svg-icons/action/list';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import * as actions from '../../actions/registrationAndLoginActions';
import { withRouter } from 'react-router';
import './Dashboard.css';

//iconElementLeft={<IconButton><NavigationClose /></IconButton>}

class WelcomeBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentGuild: "",
      valueSingle: "",
      fix: false
    };

    this.handleChangeSingle = this.handleChangeSingle.bind(this);
    this.fixBar = this.fixBar.bind(this);
  }

  componentDidMount(){
    window.addEventListener('scroll',this.fixBar);
    const currentGuild = this.props.activeUserGuilds.filter(guild => {
      return guild.name === decodeURIComponent(this.props.guildName);
    });
    this.setState({valueSingle: currentGuild[0].id, currentGuild: currentGuild[0]});
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.fixBar);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.guildName !== nextProps.guildName){
      const encodedGuild = nextProps.guildName;
      const oldGuild = decodeURIComponent(this.props.guildName);
      const currentGuild = decodeURIComponent(encodedGuild);
      if(nextProps.location.pathname.startsWith(`/dashboard/channel/${oldGuild}/members`) && nextProps.location.pathname !== `/dashboard/channel/${oldGuild}/members`){
        nextProps.history.replace(`/dashboard/channel/${encodedGuild}/members`);
      }
      else if(nextProps.location.pathname.startsWith(`/dashboard/channel/${oldGuild}/teams`) && nextProps.location.pathname !== `/dashboard/channel/${oldGuild}/teams`){
        nextProps.history.replace(`/dashboard/channel/${encodedGuild}/teams`);
      }
      else if(nextProps.location.pathname === `/dashboard/channel/${oldGuild}/guild`){
        nextProps.history.replace(`/dashboard/channel/${encodedGuild}/guild`);
      }
      else if(nextProps.location.pathname === `/dashboard/channel/${oldGuild}/members`){
        nextProps.history.replace(`/dashboard/channel/${encodedGuild}/members`);
      }
      else if(nextProps.location.pathname === `/dashboard/channel/${oldGuild}/teams`){
        nextProps.history.replace(`/dashboard/channel/${encodedGuild}/teams`);
      }
      //else if(nextProps.location.pathname.endsWith())

    }
  }
  handleChangeSingle(event, value){
    //console.log(this.state.valueSingle);
    console.log(event);
    this.setState({valueSingle: value});
    this.props.dispatch(actions.setActiveGuild(value));
    const currentGuild = this.props.activeUserGuilds.filter(guild => {
      return guild.id = this.props.activeGuild;
    });
    this.props.location.pathname.split('/');
    this.props.history.replace(`/dashboard/channel/${encodeURIComponent(currentGuild.name)}/`);
  }
  fixBar(){
    if(window.scrollY > 140)
      this.setState({fix: true});
    else if(window.scrollY <= 140){
      this.setState({fix: false});
    }
  }
  /*handleOpenMenu = () => {
    this.setState({
      openMenu: true
    });
  }
  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
  }*/

  render(){
    let count = 0;
    const guildMenuOptions = this.props.activeUserGuilds.map(guild => {
      return (<MenuItem value={guild.id} primaryText={guild.name} key={count++} />);
    });
    //for(let i=0; i < activeUserGuilds.length; i++)
    let classFix=this.state.fix?"fix":"";
  return (
    <div className={"welcomeBar "+classFix} ref="fixedWelcome">
      <AppBar
        title={<span>Welcome, {this.props.user.username}!</span>}
        iconElementLeft={        
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          onChange={this.handleChangeSingle}
          value={this.state.valueSingle}
        >
          {guildMenuOptions}
        </IconMenu>
      }
        iconElementRight={
            <div className="rightAppbar">
              <FlatButton label="Log Out" style={{color: 'white'}} onClick={this.props.logOut}/>
              <IconButton className="iconButton" style={{fill: 'white'}} onClick={this.props.togglePanel}><ActionList /></IconButton>
            </div>
        }
      />
    </div>
  );
}
/*            <Toolbar>
              <ToolbarGroup firstChild={true}>
                <FlatButton label="Log Out" onClick={this.props.logOut}/>
                <ToolbarSeparator />
                <IconButton onClick={this.props.logOut}><ActionNoteAdd /></IconButton>
              </ToolbarGroup>
            </Toolbar>*/
 /*
            <div>
              <FlatButton label="Log Out" onClick={this.props.logOut}/>
              <IconButton onClick={this.props.logOut}><ActionNoteAdd /></IconButton>
            </div>
*/
  /*if(props.previous && props.next){
    return (
      <div className="registrationNavigation">
        <IconButton className="previousButton" iconClassName="" onClick={() => props.changeSection(props.previousSection)}>
          <NavigationArrowBack />
        </IconButton>
          <IconButton className="nextButton" iconClassName="" disabled={props.nextButtonDisabled} onClick={() => props.changeSection(props.nextSection)}>
            <NavigationArrowForward />
          </IconButton>
      </div>
      );
  }
  else if(props.next){
    return (
        <div className="registrationNavigation">
            <IconButton className="nextButton" iconClassName="" disabled={props.nextButtonDisabled} onClick={() => props.changeSection(props.nextSection)}>
              <NavigationArrowForward />
            </IconButton>
        </div>
      );
  }*/
}

//<Link to="/" className="nextButton"><button type="button">Next</button></Link>

const mapStateToProps = (state, props) => ({
  /*isAuthenticated: state.registrationAndLogin.isAuthenticated,
  authorizationChecked: state.registrationAndLogin.authorizationChecked,
  activeUser: state.registrationAndLogin.activeUser*/
  //slideIndex: state.dashboard.slideIndex
  activeGuild: state.registrationAndLogin.activeGuild,
  activeUserGuilds: state.registrationAndLogin.activeUserGuilds
});

export default withRouter(connect(mapStateToProps)(WelcomeBar));