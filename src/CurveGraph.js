import React, { Component } from 'react';
import './CurveGraph.css';

class CurveGraph extends Component {
  render() {
    const curve = this.props.curves[this.props.selected];
    const results = this.props.results[this.props.selected];
    const resultList = [];
    results.forEach(result => {
      resultList.push(<li>{result}</li>);
    });
    return (
      <div className="CurveGraph">
        <p>
          Rendering Curve {this.props.selected}: {curve.size}{' '}
          {curve.distribution}
        </p>
        <ul style={{ display: 'none' }}>{resultList}</ul>
      </div>
    );
  }
}

export default CurveGraph;
