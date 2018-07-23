import { Component } from 'react';
import {connect} from 'react-redux';
//import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import * as actions from '../../actions/registrationAndLoginActions';
import 'typeface-roboto';


class Authorization extends Component {
  constructor(props) {
      super(props);
  }
  componentWillMount(){
    this.props.dispatch(actions.checkAuthentication());
  }

  render(){
    return false;
  }
}
const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps)(Authorization);