import React, { Component } from 'react';
import './CurveList.css';
import Curve from './Curve';

class CurveList extends Component {
  render() {
    const curves = [];
    this.props.curves.forEach((curve, index) => {
      curves.push(
        <Curve
          key={index}
          curve={curve}
          results={this.props.results[index]}
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
              <th rowSpan="3">Size</th>
              <th colSpan="6">Parameters</th>
              <th colSpan="8">Percentiles</th>
            </tr>
            <tr>
              <th colSpan="4">PERT</th>
              <th colSpan="2">Gaussian</th>
              <th colSpan="4">PERT</th>
              <th colSpan="4">Gaussian</th>
            </tr>
            <tr>
              <th>Min</th>
              <th>Max</th>
              <th>Mode</th>
              <th>Height</th>
              <th>Mean</th>
              <th>Std. dev.</th>
              <th>3rd</th>
              <th>50th</th>
              <th>80th</th>
              <th>97th</th>
              <th>3rd</th>
              <th>50th</th>
              <th>80th</th>
              <th>97th</th>
            </tr>
          </thead>
          <tbody>{curves}</tbody>
        </table>
      </div>
    );
  }
}

export default CurveList;
