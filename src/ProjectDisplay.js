import React, { Component } from 'react';
import Graph from './Graph';
import ProjectList from './ProjectList';
import { generateProjectResults } from './data';

class ProjectDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      iterations: 2000,
      projects: [
        { id: 1, epics: [1, 0, 0, 0, 0] },
        { id: 2, epics: [0, 1, 0, 0, 0] },
        { id: 3, epics: [0, 0, 1, 0, 0] },
        { id: 4, epics: [0, 0, 0, 1, 0] },
        { id: 5, epics: [0, 0, 0, 0, 1] },
        { id: 6, epics: [1, 1, 1, 1, 1] },
      ],
    };

    this.handleProjectDelete = this.handleProjectDelete.bind(this);
  }

  handleProjectDelete(projectID) {
    this.setState((prevState, props) => {
      const newProjects = prevState.projects.filter(
        project => project.id !== projectID
      );
      return { projects: newProjects };
    });
  }

  render() {
    const selected = this.state.selected;
    const iterations = this.state.iterations;
    const projects = this.state.projects;
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
          onProjectDelete={this.handleProjectDelete}
        />
      </div>
    );
  }
}

export default ProjectDisplay;
