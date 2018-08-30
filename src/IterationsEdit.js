import React, { Component } from 'react';
import styles from './IterationsEdit.module.scss';

class IterationsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { iterations: this.props.iterations };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ iterations: event.target.value });
  }

  handleSubmit(event) {
    this.props.onIterationsUpdate(this.state.iterations);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.IterationsEdit}>
        <label>
          Iterations:
          <input
            type="text"
            value={this.state.iterations}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Update" />
      </form>
    );
  }
}

export default IterationsEdit;
