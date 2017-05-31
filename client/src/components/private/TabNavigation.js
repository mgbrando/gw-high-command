import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

function TabNavigation(props){
    return (
      <div>
        <Tabs
          onChange={props.tabChange}
          value={props.slideIndex}
        >
          <Tab label="Guild" value={0} />
          <Tab label="Members" value={1} />
          <Tab label="Teams" value={2} />
        </Tabs>
      </div>
    );
}

export default TabNavigation;