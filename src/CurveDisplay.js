import React, { Component } from 'react';
import Graph from './Graph';
import CurveList from './CurveList';

class CurveDisplay extends Component {
  render() {
    const selected = 0;
    const curves = this.props.curves;
    const results = this.props.results;
    const selectedCurves = curves[selected];
    const selectedResults = results[selected];

    const curveGraphs = [];
    for (const distributionName in selectedResults) {
      const label =
        'Curve: ' + selectedCurves.size + ' (' + distributionName + ')';
      curveGraphs.push(
        <Graph
          key={distributionName}
          label={label}
          results={selectedResults[distributionName]}
        />
      );
    }

    return (
      <div className="CurveDisplay">
        {curveGraphs}
        <CurveList curves={curves} results={results} selected={selected} />
      </div>
    );
  }
}

export default CurveDisplay;
