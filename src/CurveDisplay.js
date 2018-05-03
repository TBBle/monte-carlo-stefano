import React, { Component } from 'react';
import CurveGraph from './CurveGraph';
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
      const label = selectedCurves.size + ' (' + distributionName + ')';
      curveGraphs.push(
        <CurveGraph
          key={distributionName}
          label={label}
          results={selectedResults[distributionName]}
        />
      );
    }

    return (
      <div className="CurveDisplay">
        {curveGraphs}
        <CurveList curves={curves} selected={selected} />
      </div>
    );
  }
}

export default CurveDisplay;
