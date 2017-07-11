import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/guildActions';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import SectionBar from '../SectionBar';
import GuildDetails from './GuildDetails';
import GuildUpgrades from './GuildUpgrades';
import CircularProgress from 'material-ui/CircularProgress';
import Pagination from 'material-ui-pagination';
import './Guild.css';

class Guild extends Component {

  constructor(props) {
    super(props);

    this.state={
      incompleteUpgradesPagination: { total: 1, number: 1, display: 1},
      completeUpgradesPagination: {total: 1, number: 1, display: 1},
      enableCompleteUpgradesPagination: false,
      enableIncompleteUpgradesPagination: false,
      visibleUpgrades: []
    };

    this.descriptionToggle = this.descriptionToggle.bind(this);
    this.onAvatarLoad = this.onAvatarLoad.bind(this);
    //this.pageSelection = this.pageSelection.bind(this);
    this.getIncompletePagination = this.getIncompletePagination.bind(this);
    this.getCompletePagination = this.getCompletePagination.bind(this);
    this.selectCompletePage = this.selectCompletePage.bind(this);
    this.selectIncompletePage = this.selectIncompletePage.bind(this);
  }

  /*displayPage(){
    switch(props.page){
      case "rankSelection":
        return (<RankSelection />);
        break;
      case "registration":
        return (<Registration />);
        break;
      case "guild":
        return (<Guild />);
        break;
      case "guildMembers":
        return (<GuildMembers />);
        break;
      case "guildTeams":
        return (<GuildTeams />);
        break;
      default:
        return (<RankSelection />);
    }
  }*/
  componentDidMount(){
      /*  this.props.dispatch('https://api.guildwars2.com/v2/account?access_token='+this.props.activeUser.apiKey)
        .then(accountInfo => {
          this.props.dispatch(actions.getGuildDetails(accountInfo.guilds[0]));
          this.props.dispatch(actions.getGuildUpgrades(accountInfo.guilds[0], this.props.activeUser.apiKey));
        })*/
    this.props.dispatch(actions.getGuildInfo(this.props.activeGuild, this.props.activeUser.apiKey));
  }
  componentWillUnmount(){
    this.props.dispatch(actions.setGuildLoadingStates());
  }
  /*componentDidUpdate(){
    this.props.dispatch(actions.getGuildInfo(this.props.activeGuild, this.props.activeUser.apiKey));
  }*/
  componentWillReceiveProps(nextProps) {
    if(nextProps.activeGuild !== this.props.activeGuild)
      this.props.dispatch(actions.getGuildInfo(nextProps.activeGuild, nextProps.activeUser.apiKey));
    else if(nextProps.refreshGuild)
      this.props.dispatch(actions.getGuildInfo(nextProps.activeGuild, nextProps.activeUser.apiKey));
    if(!this.guildUpgrades || (this.guildUpgrades.length !== nextProps.guildUpgrades.length)){
      if(nextProps.guildUpgrades.length > 50){
        let pages;
        pages = Math.ceil(nextProps.guildUpgrades.length/50);
        //pages = (nextProps.guildUpgrades.length%50 === 0) ? pages : pages+1;
        const display = (pages > 10) ? 10 : pages; 
        if(this.state.enableIncompleteUpgradesPagination)
          this.setState({incompleteUpgradesPagination: {total: pages, number: this.state.incompleteUpgradesPagination.number, display: display}});
        else
          this.setState({incompleteUpgradesPagination: {total: pages, number: this.state.incompleteUpgradesPagination.number, display: display}, 
            enableIncompleteUpgradesPagination: true
          });
      }
      else{
        if(this.state.enableIncompleteUpgradesPagination)
          this.setState({enableIncompleteUpgradesPagination: false});
      }
    }
    if(!this.guildCompletedUpgrades || (this.guildCompletedUpgrades.length !== nextProps.guildCompletedUpgrades.length)){
      if(nextProps.guildCompletedUpgrades.length > 50){
        let pages;
        pages = Math.ceil(nextProps.guildCompletedUpgrades.length/50);
        //pages = (nextProps.guildCompletedUpgrades.length%50 === 0) ? pages : pages+1;
        const display = (pages > 10) ? 10 : pages; 
        if(this.state.enableCompleteUpgradesPagination)
          this.setState({completeUpgradesPagination: {total: pages, number: this.state.completeUpgradesPagination.number, display: display}});
        else
          this.setState({completeUpgradesPagination: {total: pages, number: this.state.completeUpgradesPagination.number, display: display}, 
            enableCompleteUpgradesPagination: true
          });
      }
      else{
        if(this.state.enableCompleteUpgradesPagination)
          this.setState({enableCompleteUpgradesPagination: false});
      }
    }
  }

  descriptionToggle(){
    this.props.dispatch(actions.descriptionToggle());
  }

  onAvatarLoad(){
    
  }
  getIncompletePagination(){
    return (<Pagination
          className="pagination"
          total = { this.state.incompleteUpgradesPagination.total }
          current = { this.state.incompleteUpgradesPagination.number }
          display = { this.state.incompleteUpgradesPagination.display }
          onChange = { number => this.selectIncompletePage(number) }
        />)
  }
  getCompletePagination(){
    return (<Pagination
          className="pagination"
          total = { this.state.completeUpgradesPagination.total }
          current = { this.state.completeUpgradesPagination.number }
          display = { this.state.completeUpgradesPagination.display }
          onChange = { number => this.selectCompletePage(number) }
        />);
  }
  selectIncompletePage(number){
    const {total, display} = this.state.incompleteUpgradesPagination
    this.setState({incompleteUpgradesPagination:{total: total, number: number, display: display}});
  }
  selectCompletePage(number){
    const {total, display} = this.state.completeUpgradesPagination
    this.setState({completeUpgradesPagination:{total: total, number: number, display: display}});
  }

  render() {
    if(this.props.guildDetailsLoading || this.props.guildUpgradesLoading || this.props.guildCoinsLoading){
      return (
      <section className="guildLoadingScreen">
          <CircularProgress size={80} thickness={5} />
      </section>
      );
    }

    /*if(this.props.guildUpgrades.length > 20){
      const guildUpgrades 
    }*/
    let completeUpgrades = [];
    if(this.state.enableCompleteUpgradesPagination){
      const pageNumber = this.state.completeUpgradesPagination.number;
      completeUpgrades = this.props.guildCompletedUpgrades.slice((pageNumber-1)*50, pageNumber*50);
    }
    else
      completeUpgrades = this.props.guildCompletedUpgrades;

    let incompleteUpgrades = [];
    if(this.state.enableIncompleteUpgradesPagination){
      const pageNumber = this.state.incompleteUpgradesPagination.number;
      incompleteUpgrades=this.props.guildUpgrades.slice((pageNumber-1)*50, pageNumber*50);
    }
    else
      incompleteUpgrades=this.props.guildUpgrades;

    return (
      <section className="guild">
        <SectionBar title="Guild Details" />
        <GuildDetails 
          loading={this.props.guildDetailsLoading} 
          display={this.props.displayGuildDetails} 
          guildDetails={this.props.guildDetails} 
          coins={this.props.coins}
        />
        <SectionBar title="Upgrades" />
        <GuildUpgrades 
          loading={this.props.guildUpgradesLoading} 
          display={this.props.displayGuildUpgrades}
          onAvatarLoad={this.onAvatarLoad}
          guildUpgrades={incompleteUpgrades} 
          guildCompletedUpgrades={completeUpgrades}
          descriptionToggle={this.descriptionToggle}
          enableCompleteUpgradesPagination={this.state.enableCompleteUpgradesPagination}
          enableIncompleteUpgradesPagination={this.state.enableIncompleteUpgradesPagination}
          getCompletePagination={this.getCompletePagination}
          getIncompletePagination={this.getIncompletePagination}
        />
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
    //activeUser: state.registrationAndLogin.activeUser,
    activeGuild: state.registrationAndLogin.activeGuild,
    guildDetails: state.guild.guildDetails,
    guildUpgrades: state.guild.guildUpgrades,
    guildCompletedUpgrades: state.guild.guildCompletedUpgrades,
    displayGuildDetails: state.guild.displayGuildDetails,
    displayGuildUpgrades: state.guild.displayGuildUpgrades,
    guildDetailsLoading: state.guild.guildDetailsLoading,
    guildUpgradesLoading: state.guild.guildUpgradesLoading,
    guildCoinsLoading: state.guild.guildCoinsLoading,
    coins: state.guild.coins,
    refreshGuild: state.guild.refreshGuild
});

export default connect(mapStateToProps)(Guild);