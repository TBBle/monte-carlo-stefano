import React, { Component } from 'react';
import './Curve.css';

class Curve extends Component {
  renderParams = () => {
    const distribution = this.props.curve.distribution;
    const parameters = this.props.curve.parameters;
    switch (distribution) {
      case 'PERT':
        return (
          <td>
            minimum = {parameters.minimum}, maximum = {parameters.maximum}, mode
            = {parameters.mode}
          </td>
        );
      case 'Gaussian':
        return (
          <td>
            mean = {parameters.mean}, sd = {parameters.sd}
          </td>
        );
      default:
        return <td>Unknown curve {distribution}</td>;
    }
  };

  renderResult = () => {
    return <td>Result here</td>;
  };

  render() {
    return (
      <tr className={this.props.selected ? 'Curve Curve-Selected' : 'Curve'}>
        <td>{this.props.curve.size}</td>
        <td>{this.props.curve.distribution}</td>
        {this.renderParams()}
        {this.renderResult()}
      </tr>
    );
  }
}

export default Curve;
