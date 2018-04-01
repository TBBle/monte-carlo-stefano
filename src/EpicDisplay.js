import React, { Component } from 'react';
import EpicGraph from './EpicGraph';
import EpicList from './EpicList';

class EpicDisplay extends Component {
  render() {
    return (
      <div className="EpicDisplay">
        <EpicGraph />
        <EpicList />
      </div>
    );
  }
}

export default EpicDisplay;
