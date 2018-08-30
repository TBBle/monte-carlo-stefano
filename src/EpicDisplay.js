import React, { Component } from 'react';
import Graph from './Graph';
import IterationsEdit from './IterationsEdit';
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
    this.handleIterationsUpdate = this.handleIterationsUpdate.bind(this);
  }

  handleIterationsUpdate(newIterations) {
    this.setState((prevState, props) => {
      const newResults = generateEpicResults(this.props.epics, newIterations);
      return {
        iterations: newIterations,
        results: newResults,
      };
    });
  }

  render() {
    // State
    const selected = this.state.selected;
    const results = this.state.results;
    const iterations = this.state.iterations;

    const epics = this.props.epics;

    const selectedEpics = epics[selected];
    const selectedResults = results[selected];

    return (
      <div>
        <IterationsEdit
          iterations={iterations}
          onIterationsUpdate={this.handleIterationsUpdate}
        />
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
