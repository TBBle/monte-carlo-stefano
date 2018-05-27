import React, { Component } from 'react';
import { percentile, round } from './data';
import './Epic.css';

function renderPercentiles(results) {
  return (
    <>
      <td>{round(percentile(results, 3), 1)}</td>
      <td>{round(percentile(results, 50), 1)}</td>
      <td>{round(percentile(results, 80), 1)}</td>
      <td>{round(percentile(results, 97), 1)}</td>
    </>
  );
}

class Epic extends Component {
  renderPERTPercentiles() {
    return renderPercentiles(this.props.results.PERT);
  }

  renderGaussianPercentiles() {
    return renderPercentiles(this.props.results.Gaussian);
  }

  render() {
    const featureCounts = [];
    const epic = this.props.epic;
    epic.features.forEach((count, index) => {
      featureCounts.push(<td key={index}>{count}</td>);
    });
    return (
      <tr className={this.props.selected ? 'Epic Epic-Selected' : 'Epic'}>
        <td>{epic.id}</td>
        {featureCounts}
        {this.renderPERTPercentiles()}
        {this.renderGaussianPercentiles()}
      </tr>
    );
  }
}

export default Epic;
