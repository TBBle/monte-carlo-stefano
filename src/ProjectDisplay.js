import React, { Component } from 'react';
import Graph from './Graph';
import ProjectList from './ProjectList';
import { generateProjectResults } from './data';

class ProjectDisplay extends Component {
  render() {
    // State
    const selected = 0;
    const iterations = 2000;
    const projects = [
      { id: 1, epics: [1, 0, 0, 0, 0] },
      { id: 2, epics: [0, 1, 0, 0, 0] },
      { id: 3, epics: [0, 0, 1, 0, 0] },
      { id: 4, epics: [0, 0, 0, 1, 0] },
      { id: 5, epics: [0, 0, 0, 0, 1] },
      { id: 6, epics: [1, 1, 1, 1, 1] },
    ];

    const epics = this.props.epics;
    const results = generateProjectResults(epics, projects, iterations);
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
