import React, { Component } from 'react';
import './Curve.css';

class Curve extends Component {
  renderPERT() {
    const parameters = this.props.curve.parameters.PERT;
    return (
      <td>
        minimum = {parameters.minimum}, maximum = {parameters.maximum}, mode ={' '}
        {parameters.mode}
      </td>
    );
  }

  renderGaussian() {
    const parameters = this.props.curve.parameters.Gaussian;
    return (
      <td>
        mean = {parameters.mean}, sd = {parameters.sd}
      </td>
    );
  }

  render() {
    return (
      <tr className={this.props.selected ? 'Curve Curve-Selected' : 'Curve'}>
        <td>{this.props.curve.size}</td>
        {this.renderPERT()}
        {this.renderGaussian()}
        <td>Result here</td>
      </tr>
    );
  }
}

export default Curve;
