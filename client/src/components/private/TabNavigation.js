import React from 'react';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
//import SwipeableViews from 'react-swipeable-views';
//import * as actions from '../../actions/navigationActions';
import * as guildActions from '../../actions/guildActions';
import * as membersActions from '../../actions/membersActions';
import * as teamsActions from '../../actions/teamsActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import SwipeableRoutes from "react-swipeable-routes";
import { Switch } from 'react-router';
import 'string.prototype.startswith';
import './Dashboard.css';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class TabNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "guild",
      fix: false
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.fixBar = this.fixBar.bind(this);
  }

  componentDidMount(){
    /*const values = this.props.location.pathname.split('/');
    if(values[values.length-1] === "dashboard")
      values[values.length-1] = "guild"
    this.setState({value: values[values.length-1]});*/
    window.addEventListener('scroll',this.fixBar);
    const pathname = this.props.location.pathname;
    if(pathname.includes("dashboard/members"))
      this.setState({value: "members"});
    else if(pathname.includes("dashboard/teams"))
      this.setState({value: "teams"});
    else
      this.setState({value: "guild"});
  }
  handleRefresh = (event) => {
    console.log(event.target.textContent);
    console.log(event.currentTarget.value);
    const value = (event.target.textContent).toLowerCase();
    //if(this.props.location.pathname.startsWith("/dashboard/"+value)){
      if("/dashboard/"+value === this.props.location.pathname){
      switch(value){
        case "guild":
          //this.props.dispatch(guildActions.getGuildInfo(this.props.activeGuild, this.props.activeUser.apiKey));
          this.props.dispatch(guildActions.refreshGuild());
          break;
        case "members":
          //this.props.dispatch(membersActions.getGuildMembers(this.props.activeGuild, this.props.activeUser.apiKey));
          this.props.dispatch(membersActions.refreshMembers());
          break;
        case "teams":
          //this.props.dispatch(teamsActions.getGuildTeams(this.props.activeGuild, this.props.activeUser.apiKey));
          this.props.dispatch(teamsActions.refreshTeams());
          break;
      }
    }
    else if(this.props.location.pathname.startsWith("/dashboard/"+value)){
      if(value === 'members')
        this.props.dispatch(membersActions.deselectMember());
      else if(value === 'teams')
        this.props.dispatch(teamsActions.deselectTeam());
      this.props.history.push('/dashboard/'+value);
    }
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.fixBar);
  }
  fixBar(){
    if(window.scrollY > 140)
      this.setState({fix: true});
    else if(window.scrollY <= 140){
      this.setState({fix: false});
    }
  }
  handleChange = (value) => {
    console.log(this.props.location.pathname);
    if("/dashboard/"+value === this.props.location.pathname)
      return;
    else{
      this.setState({
          value: value,
      });
      this.props.history.push('/dashboard/'+value);
    }
    /*else{
      this.setState({
          value: value,
      });

      if(value === "guild"){
        //this.props.dispatch(actions.clearRefresh());
        this.props.history.push('/dashboard/guild');
      }
      else if(value === "members"){
        //this.props.dispatch(actions.clearRefresh());
        this.props.history.push('/dashboard/members');
      }
      else if(value === "teams"){
        //this.props.dispatch(actions.clearRefresh());
        this.props.history.push('/dashboard/teams');
      }
    }*/
/*this.setState({
          slideIndex: value,
        });
    if(value === 0){
      if("dashboard/guild" === this.props.location.pathname)
        return;
      else{
        this.props.history.push('/dashboard/guild');
      }
    }
    else if(value === 1){
      if("dashboard/members" === this.props.location.pathname)
        return;
      else{
        this.props.history.push('/dashboard/members');
      }
    }
    else if(value === 2){
      if("dashboard/teams" === this.props.location.pathname)
        return;
      else{
        this.props.history.push('/dashboard/teams');
      }
    }*/
    /*this.setState({
      slideIndex: value,
    });*/
  };

  render() {
    let classFix=this.state.fix?"fixTabs":"";
    return (
      <div>
        <Tabs
          onTouchTap={this.handleRefresh}
          onChange={this.handleChange}
          value={this.state.value}
          className={"tabNavigation "+classFix}
        >
          <Tab label="Guild" value="guild" />
          <Tab label="Members" value="members" />
          <Tab label="Teams" value="teams" />
        </Tabs>
      </div>
    );
  }
}

TabNavigation.propTypes = {
    router: PropTypes.object,
    location: PropTypes.object
};

const mapStateToProps = (state, props) => ({

});

export default withRouter(connect(mapStateToProps)(TabNavigation));