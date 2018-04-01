import React, { Component } from 'react';
import './CurveList.css';
import Curve from './Curve';

class CurveList extends Component {
  render() {
    const curves = [];
    this.props.curves.forEach((curve, index) => {
      curves.push(
        <Curve
          curve={curve}
          selected={index === this.props.selected ? true : false}
        />
      );
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
