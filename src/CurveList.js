import React, { Component } from 'react';
import './CurveList.css';
import CurveRegistry from './CurveRegistry';

class CurveList extends Component {
  render() {
    const curves = [];
    this.props.curves.forEach((curve, index) => {
      if (curve.distribution in CurveRegistry) {
        const CurveComponent = CurveRegistry[curve.distribution];
        curves.push(
          <CurveComponent
            key={index}
            curve={curve}
            selected={index === this.props.selected ? true : false}
          />
        );
      } else {
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
