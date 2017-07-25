import React from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import SelectableList from '../SelectableList';
import './Guild.css';

/*let SelectableList = List;

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}
SelectableList = wrapState(SelectableList);*/

function GuildUpgrades(props){
  if(props.loading && props.display){
    return (
      <div className="guildUpgrades">
        <Paper className="infoSection" zDepth={2}>
          <CircularProgress size={80} thickness={5} />
        </Paper>
      </div>
    );
  }
  else if(props.display){
    let count=0;
    const completedUpgradeComponentsTwo = props.guildCompletedUpgrades.map((upgrade) => {
      return (<ListItem 
                key={count++}
                className="completedUpgrade"
                primaryText={upgrade.name}
                primaryTogglesNestedList={true}
                leftAvatar={<Avatar src={upgrade.icon} />}
                nestedItems={[
                  <ListItem
                    key={1}
                    disabled={true}
                    primaryText={upgrade.type}
                    secondaryText={upgrade.description}
                    secondaryTextLines={2}
                  />,
                ]}
              />);
    });
    const completedUpgradeComponentsOne = completedUpgradeComponentsTwo.splice(0, (count/2));
    console.log(completedUpgradeComponentsOne);
    count=0;
    const upgradeComponentsOne = props.guildUpgrades.map((upgrade) => {
      return (<ListItem 
                key={count++}
                className="upgrade"
                primaryText={upgrade.name}
                primaryTogglesNestedList={true}
                leftAvatar={<Avatar src={upgrade.icon} />}
                nestedItems={[
                  <ListItem
                    key={1}
                    disabled={true}
                    primaryText={upgrade.type}
                    secondaryText={upgrade.description}
                    secondaryTextLines={2}
                  />
                ]}
              />);
    });;
    const upgradeComponentsTwo = upgradeComponentsOne.splice(0, (count/2));
    console.log(upgradeComponentsOne);

    const completePagination= props.enableCompleteUpgradesPagination ?
        props.getCompletePagination()
        :
        (<span></span>);

    const incompletePagination= props.enableIncompleteUpgradesPagination ?
        props.getIncompletePagination()
        :
        (<span></span>);

    return (
      <div className="guildUpgrades">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="upgrades completedUpgrades" zDepth={5}>
            <h1 className="sectionHeader">Complete</h1>
            <div className="upgradesLists">
            <div className="upgradeList">
              <SelectableList defaultValue={3}>
                {completedUpgradeComponentsOne}
              </SelectableList>
            </div>
            <div className="upgradeList">
              <SelectableList defaultValue={3}>
                {completedUpgradeComponentsTwo}
              </SelectableList>
            </div>
            </div>
            {completePagination}
          </Paper>
          <Paper className="upgrades incompleteUpgrades" zDepth={5}>
            <h1 className="sectionHeader">Incomplete</h1>
            <div className="upgradesLists">
            <div className="upgradeList">
              <SelectableList defaultValue={3}>
                {upgradeComponentsOne}
              </SelectableList>
            </div>
            <div className="upgradeList">
              <SelectableList defaultValue={3}>
                {upgradeComponentsTwo}
              </SelectableList>
            </div>
            </div>
            {incompletePagination}
          </Paper>
        </Paper>
      </div>
    );
  }
  else{
    return false;
  }
  //<FlatButton label="Log Out" onClick={props.logOut}/>
}
            /*<div className="seeMore">
                <span>See More Upgrades...</span>
            </div>*/
 /*     <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default GuildUpgrades; 