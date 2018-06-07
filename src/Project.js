import React, { Component } from 'react';
import { percentile, round } from './data';
import './Project.css';

function renderPercentiles(results) {
  return (
    <>
      <td>{round(percentile(results, 3), 1)}</td>
      <td>{round(percentile(results, 50), 1)}</td>
      <td>{round(percentile(results, 80), 1)}</td>
      <td>{round(percentile(results, 97), 1)}</td>
    </>
  );
}

class Project extends Component {
  renderPERTPercentiles() {
    return renderPercentiles(this.props.results.PERT);
  }

  renderGaussianPercentiles() {
    return renderPercentiles(this.props.results.Gaussian);
  }

  render() {
    const epicCounts = [];
    const project = this.props.project;
    project.epics.forEach((count, index) => {
      epicCounts.push(<td key={index}>{count}</td>);
    });
    return (
      <tr
        className={this.props.selected ? 'Project Project-Selected' : 'Project'}
      >
        <td>{project.id}</td>
        {epicCounts}
        {this.renderPERTPercentiles()}
        {this.renderGaussianPercentiles()}
        <td>
          <button onClick={this.props.onEdit}>Edit...</button>
          <button onClick={this.props.onDelete}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default Project;
