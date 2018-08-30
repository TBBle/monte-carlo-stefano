import React, { Component } from 'react';
import Graph from './Graph';
import ProjectEditModal from './ProjectEditModal';
import ProjectList from './ProjectList';
import { generateProjectResults } from './data';

class ProjectDisplay extends Component {
  constructor(props) {
    super(props);
    const defaultIterations = 2000;
    const defaultProjects = [
      { id: 1, epics: [1, 0, 0, 0, 0] },
      { id: 2, epics: [0, 1, 0, 0, 0] },
      { id: 3, epics: [0, 0, 1, 0, 0] },
      { id: 4, epics: [0, 0, 0, 1, 0] },
      { id: 5, epics: [0, 0, 0, 0, 1] },
      { id: 6, epics: [1, 1, 1, 1, 1] },
    ];
    const initialResults = generateProjectResults(
      this.props.epics,
      defaultProjects,
      defaultIterations
    );
    this.state = {
      selected: 0,
      iterations: defaultIterations,
      projects: defaultProjects,
      results: initialResults,
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
      // TODO: It would be better to recalculate the results only for
      // the changed project.
      const newProjects = prevState.projects.map(
        project =>
          project.id === prevState.editProjectID ? updatedProject : project
      );
      const newResults = generateProjectResults(
        this.props.epics,
        newProjects,
        prevState.iterations
      );
      return {
        projects: newProjects,
        editProjectID: null,
        results: newResults,
      };
    });
  }

  handleProjectDelete(projectID) {
    this.setState((prevState, props) => {
      // TODO: It would be better to remove the results for the
      // deleted project, rather than recalculate them all
      const newProjects = prevState.projects.filter(
        project => project.id !== projectID
      );
      const newResults = generateProjectResults(
        this.props.epics,
        newProjects,
        prevState.iterations
      );
      return { projects: newProjects, results: newResults };
    });
  }

  render() {
    const selected = this.state.selected;
    const projects = this.state.projects;
    const results = this.state.results;

    const epics = this.props.epics;

    const selectedProjects = projects[selected];
    const selectedResults = results[selected];

    const editing = this.state.editProjectID !== null;
    const editProject = editing
      ? this.state.projects.find(
          project => project.id === this.state.editProjectID
        )
      : null;

    return (
      <div>
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
