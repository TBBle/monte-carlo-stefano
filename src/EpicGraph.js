import React, { Component } from 'react';
import './EpicGraph.css';

class EpicGraph extends Component {
  render() {
    const epic = this.props.epics[this.props.selected];
    const results = this.props.results[this.props.selected];
    const resultList = [];
    results.forEach(result => {
      resultList.push(<li>{result}</li>);
    });
    return (
      <div className="EpicGraph">
        <p>Rendering Epic {epic.id}</p>
        <ul style={{ display: 'none' }}>{resultList}</ul>
      </div>
    );
  }
}

export default EpicGraph;
