import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { Switch } from 'react-router';
import {connect} from 'react-redux';
import RankSelection from './rankselection/RankSelection';
import MemberRegistration from './rankselection/MemberRegistration.js';
import LeaderLogin from './rankselection/LeaderLogin';
import Dashboard from './private/Dashboard';
import Authorization from './private/Authorization';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.displayPage = this.displayPage.bind(this);
    //this.displaySideBar = this.displaySideBar.bind(this);
    this.getPage = this.getPage.bind(this);
  }

  getPage(page){
    //action to change the page state on the backend
  }
  componentDidMount(){
   // this.props.dispatch();
  }
  displayPage(){
    switch(this.props.page){
      case "rankSelection":
        return (<RankSelection getPage={this.getPage()} />);
/*    case "guild":
        return (<Guild getPage={this.getPage} />);
        break;
      case "guildMembers":
        return (<GuildMembers getPage={this.getPage} />);
        break;
      case "guildTeams":
        return (<GuildTeams getPage={this.getPage} />);
        break;
      case "leaderLogin":
        return (<LeaderLogin getPage={this.getPage} />);
        break;
      case "leaderRegistration":
        return (<LeaderRegistration getPage={this.getPage} />);
        break;
      case "memberRegistration":
        return (<MemberRegistration getPage={this.getPage} />);
        break;*/
      default:
        return (<RankSelection getPage={this.getPage} />);
    }
  }
  //Maybe put displays in hasUpdated
 /* displaySideBar(){
    if(this.props.page === 'guild' || this.props.page === 'guildMembers' || this.props.page === 'guildTeams'){
      return (<SideBar />);
    }
  }*/

  render() {
    return (
      
      <div className="App">
        <div className="App-header">
          <h2>GW2 High Command</h2>
        </div>
        <main>
          <Switch>
            <Route exact path='/' component={RankSelection}/>
            <Route exact path='/registration/:rank' component={MemberRegistration}/>
            <Route exact path='/login' component={LeaderLogin}/>
            <Route path='/authorization' component={Authorization} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </main>
      </div>
    );
  }
}
//{this.displayPage()}
//{this.displaySideBar()}
const mapStateToProps = (state, props) => ({
    page: state.page,
    log: state.log
});

export default connect(mapStateToProps)(App);
