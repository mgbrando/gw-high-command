import React, { Component } from 'react';
import './App.css';

class App extends Component {
  displayPage(page){
    switch(page){
      case "rankSelection":
        return (<RankSelection />);
        break;
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>GW2 High Command</h2>
        </div>
        <RankSelection />
      </div>
    );
  }
}

export default App;
