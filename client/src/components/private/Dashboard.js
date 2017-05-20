import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../actions/registrationAndLoginActions';
/*import GuildSelectionForm from './GuildSelectionForm';
import SectionNavigation from './SectionNavigation';
import GuildList from './GuildList';
import LeaderLoginCredentials from './LeaderLoginCredentials';
import UserNameAndPasswordForm from './UserNameAndPasswordForm';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';*/
//import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
//import '../RankSelection.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(<h1>HELLO</h1>);
  }
}

const mapStateToProps = (state, props) => ({

});

export default connect(mapStateToProps)(Dashboard);