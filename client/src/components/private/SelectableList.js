import React, {Component} from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';

//let SelectableList = List;

export function wrapState(ComposedComponent) {
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

//SelectableList = wrapState(SelectableList);

//export default SelectableList;