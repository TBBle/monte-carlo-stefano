import React, { Component } from 'react';
import CurveGraph from './CurveGraph';
import CurveList from './CurveList';

class CurveDisplay extends Component {
  render() {
    const selected = 0;

    return (
      <div className="CurveDisplay">
        <CurveGraph curves={this.props.curves} selected={selected} />
        <CurveList curves={this.props.curves} selected={selected} />
      </div>
    );
  }
}

export default CurveDisplay;
