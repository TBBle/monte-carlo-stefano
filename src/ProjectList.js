import React, { Component } from 'react';
import './ProjectList.css';
import Project from './Project';

class ProjectList extends Component {
  render() {
    const epicHeaders = [];
    this.props.epics.forEach((epic, index) => {
      epicHeaders.push(<th key={index}>{epic.size}</th>);
    });
    const projects = [];
    this.props.projects.forEach((project, index) => {
      projects.push(
        <Project
          key={project.id}
          project={project}
          epics={this.props.epics}
          results={this.props.results[index]}
          selected={index === this.props.selected}
        />
      );
    });
    return (
      <div className="ProjectList">
        <h2>Projects</h2>
        <table>
          <thead>
            <tr>
              <th rowSpan="3">ID</th>
              <th colSpan={epicHeaders.length}>Parameters</th>
              <th colSpan="8">Percentiles</th>
            </tr>
            <tr>
              <th colSpan={epicHeaders.length}>Epics</th>
              <th colSpan="4">PERT</th>
              <th colSpan="4">Gaussian</th>
            </tr>
            <tr>
              {epicHeaders}
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
          <tbody>{projects}</tbody>
        </table>
      </div>
    );
  }
}

export default ProjectList;
