import React, { Component } from 'react';
import './Curve.css';

class Curve extends Component {
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
