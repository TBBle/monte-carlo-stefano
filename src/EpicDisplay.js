import React, { Component } from 'react';
import Graph from './Graph';
import EpicList from './EpicList';

class EpicDisplay extends Component {
  render() {
    const selected = 0;
    const curves = this.props.curves;
    const epics = this.props.epics;
    const results = this.props.results;
    const selectedEpics = epics[selected];
    const selectedResults = results[selected];

    const epicGraphs = [];
    for (const distributionName in selectedResults) {
      const label = 'Epic ' + selectedEpics.id + ' (' + distributionName + ')';
      epicGraphs.push(
        <Graph
          key={distributionName}
          label={label}
          results={selectedResults[distributionName]}
        />
      );
    }

    return (
      <div className="EpicDisplay">
        {epicGraphs}
        <EpicList
          curves={curves}
          epics={epics}
          results={results}
          selected={selected}
        />
      </div>
    );
  }
}

export default EpicDisplay;
