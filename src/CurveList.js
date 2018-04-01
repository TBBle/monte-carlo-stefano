import React, { Component } from 'react';
import './CurveList.css';
import Curve from './Curve';

class CurveList extends Component {
  render() {
    return (
      <div className="CurveList">
        <h2>Curves</h2>
        <table>
          <tr>
            <th>Size</th>
            <th>Curve</th>
            <th>Parameters</th>
            <th>Result</th>
          </tr>
          <Curve />
          <Curve />
        </table>
      </div>
    );
  }
}

export default CurveList;
