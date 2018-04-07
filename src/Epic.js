import React, { Component } from 'react';
import './Epic.css';

class Epic extends Component {
  renderResult = () => {
    return <td>Result here</td>;
  };

  render() {
    const curveCounts = [];
    const epic = this.props.epic;
    epic.curves.forEach((count, index) => {
      curveCounts.push(<td key={index}>{count}</td>);
    });
    return (
      <tr className={this.props.selected ? 'Epic Epic-Selected' : 'Epic'}>
        <td>{epic.id}</td>
        {curveCounts}
        {this.renderResult()}
      </tr>
    );
  }
}

export default Epic;
