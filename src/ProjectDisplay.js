import React, { Component } from 'react';
import Graph from './Graph';
import ProjectEditModal from './ProjectEditModal';
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
      editProjectID: null,
    };

    this.handleProjectEdit = this.handleProjectEdit.bind(this);
    this.handleProjectEditCancel = this.handleProjectEditCancel.bind(this);
    this.handleProjectEditUpdate = this.handleProjectEditUpdate.bind(this);
    this.handleProjectDelete = this.handleProjectDelete.bind(this);
  }

  handleProjectEdit(projectID) {
    this.setState({ editProjectID: projectID });
  }

  handleProjectEditCancel() {
    this.setState({ editProjectID: null });
  }

  handleProjectEditUpdate(updatedProject) {
    this.setState((prevState, props) => {
      const newProjects = prevState.projects.map(
        project =>
          project.id === prevState.editProjectID ? updatedProject : project
      );
      return { projects: newProjects, editProjectID: null };
    });
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

    const editing = this.state.editProjectID !== null;
    const editProject = editing
      ? this.state.projects.find(
          project => project.id === this.state.editProjectID
        )
      : null;

    return (
      <div className="ProjectDisplay">
        <Graph
          label={'Project ' + selectedProjects.id}
          results={selectedResults}
        />
        <ProjectList
          epics={epics}
          projects={projects}
          results={results}
          selected={selected}
          onProjectEdit={this.handleProjectEdit}
          onProjectDelete={this.handleProjectDelete}
        />
        {editing && (
          <ProjectEditModal
            epics={epics}
            project={editProject}
            onUpdate={this.handleProjectEditUpdate}
            onCancel={this.handleProjectEditCancel}
          />
        )}
      </div>
    );
  }
}

export default ProjectDisplay;
