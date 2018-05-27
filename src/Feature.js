import React, { Component } from 'react';
import { percentile, round } from './data';
import './Feature.css';

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

class Feature extends Component {
  renderPERT() {
    const parameters = this.props.feature.parameters.PERT;
    return (
      <>
        <td>{parameters.minimum}</td>
        <td>{parameters.maximum}</td>
        <td>{parameters.mode}</td>
        <td>{parameters.height}</td>
      </>
    );
  }

  renderPERTPercentiles() {
    return renderPercentiles(this.props.results.PERT);
  }

  renderGaussian() {
    const parameters = this.props.feature.parameters.Gaussian;
    return (
      <>
        <td>{parameters.mean}</td>
        <td>{parameters.sd}</td>
      </>
    );
  }

  renderGaussianPercentiles() {
    return renderPercentiles(this.props.results.Gaussian);
  }

  render() {
    return (
      <tr
        className={this.props.selected ? 'Feature Feature-Selected' : 'Feature'}
      >
        <td>{this.props.feature.size}</td>
        {this.renderPERT()}
        {this.renderGaussian()}
        {this.renderPERTPercentiles()}
        {this.renderGaussianPercentiles()}
      </tr>
    );
  }
}

export default Feature;
