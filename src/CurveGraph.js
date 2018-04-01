import React, { Component } from 'react';
import './CurveGraph.css';

class CurveGraph extends Component {
  render() {
    const curve = this.props.curves[this.props.selected];
    return (
      <p className="CurveGraph">
        Rendering Curve {this.props.selected}: {curve.size} {curve.distribution}
      </p>
    );
  }
}

export default CurveGraph;
