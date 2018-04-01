import React, { Component } from 'react';
import EpicGraph from './EpicGraph';
import EpicList from './EpicList';

class EpicDisplay extends Component {
  render() {
    const selected = 0;
    return (
      <div className="EpicDisplay">
        <EpicGraph
          curves={this.props.curves}
          epics={this.props.epics}
          selected={selected}
        />
        <EpicList
          curves={this.props.curves}
          epics={this.props.epics}
          selected={selected}
        />
      </div>
    );
  }
}

export default EpicDisplay;
