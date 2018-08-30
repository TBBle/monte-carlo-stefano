import React, { Component } from 'react';
import Graph from './Graph';
import EpicList from './EpicList';
import { generateEpicResults } from './data';

class EpicDisplay extends Component {
  constructor(props) {
    super(props);
    const defaultIterations = 2000;
    const initialResults = generateEpicResults(
      this.props.epics,
      defaultIterations
    );

    this.state = {
      selected: 0,
      iterations: defaultIterations,
      results: initialResults,
    };
  }
  render() {
    // State
    const selected = this.state.selected;
    const results = this.state.results;

    const epics = this.props.epics;

    const selectedEpics = epics[selected];
    const selectedResults = results[selected];

    return (
      <div>
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
