import React, { Component } from 'react';
import ReactModal from 'react-modal';

class ProjectEditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: this.props.project,
    };

    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangeEpic = this.handleChangeEpic.bind(this);
    this.handleOkay = this.handleOkay.bind(this);
  }

  handleChangeID(event) {
    const newID = event.target.value;
    this.setState((prevState, props) => {
      const newProject = Object.assign({}, prevState.project, {
        id: newID,
      });
      return { project: newProject };
    });
  }

  handleChangeEpic(epicIndex, event) {
    const newValue = event.target.valueAsNumber;
    this.setState((prevState, props) => {
      const newProject = Object.assign({}, prevState.project, {
        epics: prevState.project.epics.map(
          (value, index) => (index === epicIndex ? newValue : value)
        ),
      });
      return { project: newProject };
    });
  }

  handleOkay() {
    this.props.onUpdate(this.state.project);
  }

  render() {
    const epicInputs = [];
    this.props.epics.forEach((epic, index) => {
      epicInputs.push(
        <div key={index}>
          {epic.size}:
          <input
            type="number"
            value={this.state.project.epics[index]}
            onChange={event => this.handleChangeEpic(index, event)}
            min={0}
          />
        </div>
      );
    });

    return (
      <ReactModal isOpen={true}>
        <div>
          Project ID:
          <input
            type="text"
            value={this.state.project.id}
            onChange={this.handleChangeID}
          />
        </div>
        {epicInputs}
        <div>
          <button onClick={this.handleOkay}>Okay</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </div>
      </ReactModal>
    );
  }
}

export default ProjectEditModal;
