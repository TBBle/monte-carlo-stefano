import React, { Component } from 'react';
import './EpicGraph.css';

class EpicGraph extends Component {
  render() {
    const epic = this.props.epics[this.props.selected];
    return <p className="EpicGraph">Rendering Epic {epic.id}</p>;
  }
}

export default EpicGraph;
