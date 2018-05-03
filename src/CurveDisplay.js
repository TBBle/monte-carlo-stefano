import React, { Component } from 'react';
import CurveGraph from './CurveGraph';
import CurveList from './CurveList';

class CurveDisplay extends Component {
  render() {
    const selected = 0;

    return (
      <div className="CurveDisplay">
        <CurveGraph
          curve={this.props.curves[selected]}
          results={this.props.results.curves[selected]}
        />
        <CurveList
          curves={this.props.curves}
          results={this.props.results.curves}
          selected={selected}
        />
      </div>
    );
  }
}

export default CurveDisplay;
