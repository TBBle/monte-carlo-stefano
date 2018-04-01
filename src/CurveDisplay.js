import React, { Component } from 'react';
import CurveGraph from './CurveGraph';
import CurveList from './CurveList';

class CurveDisplay extends Component {
  render() {
    return (
      <div className="CurveDisplay">
        <CurveGraph />
        <CurveList />
      </div>
    );
  }
}

export default CurveDisplay;
