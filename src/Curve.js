import React, { Component } from 'react';
import { percentile, round } from './data';
import './Curve.css';

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

class Curve extends Component {
  renderPERT() {
    const parameters = this.props.curve.parameters.PERT;
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
    const parameters = this.props.curve.parameters.Gaussian;
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
      <tr className={this.props.selected ? 'Curve Curve-Selected' : 'Curve'}>
        <td>{this.props.curve.size}</td>
        {this.renderPERT()}
        {this.renderGaussian()}
        {this.renderPERTPercentiles()}
        {this.renderGaussianPercentiles()}
      </tr>
    );
  }
}

export default Curve;
