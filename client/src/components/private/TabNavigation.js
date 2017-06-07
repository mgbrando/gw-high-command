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
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    console.log(this.props.location.pathname);
    if("dashboard/"+value === this.props.location.pathname){return;}
    else if(value === "guild"){
      this.props.history.push('/dashboard/guild');
    }
    else if(value === "members"){
      this.props.history.push('/dashboard/members');
    }
    else{
      this.props.history.push('/dashboard/teams');
    }
    /*this.setState({
      slideIndex: value,
    });*/
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          className="tabNavigation"
        >
          <Tab label="Guild" value="guild" />
          <Tab label="Members" value="members" />
          <Tab label="Teams" value="teams" />
        </Tabs>
        <SwipeableRoutes
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          {this.props.routes}
        </SwipeableRoutes>
      </div>
    );
  }
}

TabNavigation.propTypes = {
    router: PropTypes.object,
    location: PropTypes.object
};

export default withRouter(TabNavigation);