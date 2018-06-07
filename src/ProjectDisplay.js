import React, { Component } from 'react';
import Graph from './Graph';
import ProjectList from './ProjectList';

class ProjectDisplay extends Component {
  render() {
    const selected = 0;
    const epics = this.props.epics;
    const projects = this.props.projects;
    const results = this.props.results;
    const selectedProjects = projects[selected];
    const selectedResults = results[selected];

    const projectGraphs = [];
    for (const distributionName in selectedResults) {
      const label =
        'Project ' + selectedProjects.id + ' (' + distributionName + ')';
      projectGraphs.push(
        <Graph
          key={distributionName}
          label={label}
          results={selectedResults[distributionName]}
        />
      );
    }

    return (
      <div className="ProjectDisplay">
        {projectGraphs}
        <ProjectList
          epics={epics}
          projects={projects}
          results={results}
          selected={selected}
        />
      </div>
    );
  }
}

export default ProjectDisplay;
