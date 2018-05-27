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
              <th rowSpan="2">ID</th>
              <th colSpan={curveHeaders.length}>Curves</th>
              <th rowSpan="2">Result</th>
            </tr>
            <tr>{curveHeaders}</tr>
          </thead>
          <tbody>{epics}</tbody>
        </table>
      </div>
    );
  }
}

export default EpicList;
