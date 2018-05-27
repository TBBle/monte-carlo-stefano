import React, { Component } from 'react';
import './EpicList.css';
import Epic from './Epic';

class EpicList extends Component {
  render() {
    const curveHeaders = [];
    this.props.curves.forEach((curve, index) => {
      curveHeaders.push(<th key={index}>{curve.size}</th>);
    });
    const epics = [];
    this.props.epics.forEach((epic, index) => {
      epics.push(
        <Epic
          key={epic.id}
          epic={epic}
          curves={this.props.curves}
          results={this.props.results[index]}
          selected={index === this.props.selected}
        />
      );
    });
    return (
      <div className="EpicList">
        <h2>Epics</h2>
        <table>
          <thead>
            <tr>
              <th rowSpan="3">ID</th>
              <th colSpan={curveHeaders.length}>Parameters</th>
              <th colSpan="8">Percentiles</th>
            </tr>
            <tr>
              <th colSpan={curveHeaders.length}>Curves</th>
              <th colSpan="4">PERT</th>
              <th colSpan="4">Gaussian</th>
            </tr>
            <tr>
              {curveHeaders}
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
          <tbody>{epics}</tbody>
        </table>
      </div>
    );
  }
}

export default EpicList;
