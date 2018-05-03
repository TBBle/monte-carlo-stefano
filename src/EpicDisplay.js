import React, { Component } from 'react';
import EpicGraph from './EpicGraph';
import EpicList from './EpicList';

class EpicDisplay extends Component {
  render() {
    const selected = 0;
    return (
      <div className="EpicDisplay">
        <EpicGraph
          epic={this.props.epics[selected]}
          results={this.props.results.epics[selected]}
        />
        <EpicList
          curves={this.props.curves}
          epics={this.props.epics}
          results={this.props.results.epics}
          selected={selected}
        />
      </div>
    );
  }
}

export default EpicDisplay;
