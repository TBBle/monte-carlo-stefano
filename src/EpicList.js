import React, { Component } from 'react';
import './EpicList.css';
import Epic from './Epic';

class EpicList extends Component {
  render() {
    return (
      <div className="EpicList">
        <h2>Epics</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>L Pert</th>
            <th>L Normal</th>
            <th>Result</th>
          </tr>
          <Epic />
          <Epic />
        </table>
      </div>
    );
  }
}

export default EpicList;
