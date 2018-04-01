import React, { Component } from 'react';
import './CurveList.css';
import PERT from './curves/PERT';
import Gaussian from './curves/Gaussian';

class CurveList extends Component {
  render() {
    const curves = [];
    this.props.curves.forEach((curve, index) => {
      // TODO: Establish a curves registry to remove hard-coded names
      switch (curve.distribution) {
        case 'PERT':
          curves.push(
            <PERT
              curve={curve}
              selected={index === this.props.selected ? true : false}
            />
          );
          break;
        case 'Gaussian':
          curves.push(
            <Gaussian
              curve={curve}
              selected={index === this.props.selected ? true : false}
            />
          );
          break;
        default:
          curves.push(
            <tr className="error">
              <td colspan="4">Unknown curve '{curve.distribution}'</td>
            </tr>
          );
      }
    });

    return (
      <div className="CurveList">
        <h2>Curves</h2>
        <table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Curve</th>
              <th>Parameters</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>{curves}</tbody>
        </table>
      </div>
    );
  }
}

export default CurveList;
