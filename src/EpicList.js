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
              <th>ID</th>
              {curveHeaders}
              <th>Result</th>
            </tr>
          </thead>
          <tbody>{epics}</tbody>
        </table>
      </div>
    );
  }
}

export default EpicList;
