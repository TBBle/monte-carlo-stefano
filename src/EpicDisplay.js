import React, { Component } from 'react';
import Graph from './Graph';
import EpicList from './EpicList';
import { generateEpicResults } from './data';

class EpicDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      iterations: 2000,
    };
  }
  render() {
    // State
    const selected = this.state.selected;
    const iterations = this.state.iterations;

    const epics = this.props.epics;
    const results = generateEpicResults(epics, iterations);
    const selectedEpics = epics[selected];
    const selectedResults = results[selected];

    return (
      <div className="EpicDisplay">
        <Graph
          label={'Epic: ' + selectedEpics.size}
          results={selectedResults}
        />
        <EpicList epics={epics} results={results} selected={selected} />
      </div>
    );
  }
}

export default EpicDisplay;
