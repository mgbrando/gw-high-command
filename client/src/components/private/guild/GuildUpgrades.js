import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
/*import {List, ListItem, makeSelectable} from 'material-ui/List';*/
import {List, ListItem} from 'react-native-elements';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {wrapState} from '../SelectableList';
import { View, FlatList } from 'react-native';
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

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
const upgradeStyle = {
  //display: 'inline-block'
  position: 'relative',
  top: 0
};

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
    const completedUpgradesList = (<List key={"completedUpgradesView"}><FlatList
      key={"completeUpgradesList"}
      data={props.guildCompletedUpgrades}
      renderItem={({item}) => (<ListItem
                key={item.id} 
                className="completedUpgrade"
                primaryText={item.name}
                primaryTogglesNestedList={true}
                leftAvatar={<Avatar src={item.icon}/>}
                nestedItems={[
                  <ListItem
                    key={1}
                    disabled={true}
                    primaryText={item.type}
                    secondaryText={item.description}
                    secondaryTextLines={2}
                  />
                ]}
              />)}
        horizontal={false}
        numColumns={2}
        ItemSeparatorComponent={<Divider />}
      /></List>);
    console.log(completedUpgradesList);
    const upgradesList = (<List key={"upgradesView"}><FlatList
      key={"upgradesList"}
      data={props.guildUpgrades}
      renderItem={({item}) => (<ListItem 
                key={item.id}
                className="upgrade"
                primaryText={item.name}
                primaryTogglesNestedList={true}
                leftAvatar={<Avatar src={item.icon}/>}
                nestedItems={[
                  <ListItem
                    key={1}
                    disabled={true}
                    primaryText={item.type}
                    secondaryText={item.description}
                    secondaryTextLines={2}
                  />
                ]}
              />)} 
        horizontal={false}
        numColumns={2}
        ItemSeparatorComponent={<Divider />}
      /></List>);
    console.log(upgradesList);
    let count=0;
    const completedUpgradeComponentsTwo = props.guildCompletedUpgrades.map((upgrade) => {
      return (<ListItem 
                key={count++}
                className="completedUpgrade"
                primaryText={upgrade.name}
                primaryTogglesNestedList={true}
                leftAvatar={<Avatar src={upgrade.icon}/>}
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
                leftAvatar={<Avatar src={upgrade.icon}/>}
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

     /*       <div className="upgradeList">
              <SelectableList defaultValue={3}>
                {completedUpgradeComponentsOne}
              </SelectableList>
            </div>
            <div className="upgradeList">
              <SelectableList defaultValue={3}>
                {completedUpgradeComponentsTwo}
              </SelectableList>
            </div>*/
           /* <div className="upgradeList">
              <SelectableList defaultValue={3}>
                {upgradeComponentsOne}
              </SelectableList>
            </div>
            <div className="upgradeList">
              <SelectableList defaultValue={3}>
                {upgradeComponentsTwo}
              </SelectableList>
            </div>*/

    return (
      <div className="guildUpgrades">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="upgrades completedUpgrades" zDepth={5}>
            <h1 className="sectionHeader">Complete</h1>
              {completedUpgradesList}
          </Paper>
          <Paper className="upgrades incompleteUpgrades" zDepth={5}>
            <h1 className="sectionHeader">Incomplete</h1>
              {upgradesList}
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
 /*     <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default GuildUpgrades; 