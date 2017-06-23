import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
//import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import SwipeableRoutes from "react-swipeable-routes";
import { Switch } from 'react-router';
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
    };
  }

  componentDidMount(){
    /*const values = this.props.location.pathname.split('/');
    if(values[values.length-1] === "dashboard")
      values[values.length-1] = "guild"
    this.setState({value: values[values.length-1]});*/
    const pathname = this.props.location.pathname;
    if(pathname.includes("dashboard/members"))
      this.setState({value: "members"});
    else if(pathname.includes("dashboard/teams"))
      this.setState({value: "teams"});
    else
      this.setState({value: "guild"});
  }
  
  handleChange = (value) => {
    console.log(this.props.location.pathname);
    if("dashboard/"+value === this.props.location.pathname)
      return;
    else{
      this.setState({
          value: value,
      });

      if(value === "guild")
        this.props.history.push('/dashboard/guild');
      else if(value === "members")
        this.props.history.push('/dashboard/members');
      else if(value === "teams")
        this.props.history.push('/dashboard/teams');
    }
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
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.value}
          className="tabNavigation"
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

export default withRouter(TabNavigation);