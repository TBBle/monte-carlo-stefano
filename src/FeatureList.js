import React, { Component } from 'react';
import './FeatureList.css';
import Feature from './Feature';

class FeatureList extends Component {
  render() {
    const features = [];
    this.props.features.forEach((feature, index) => {
      features.push(
        <Feature
          key={index}
          feature={feature}
          results={this.props.results[index]}
          selected={index === this.props.selected ? true : false}
        />
      );
    });

    return (
      <div className="FeatureList">
        <h2>Features</h2>
        <table>
          <thead>
            <tr>
              <th rowSpan="3">Size</th>
              <th colSpan="6">Parameters</th>
              <th colSpan="8">Percentiles</th>
            </tr>
            <tr>
              <th colSpan="4">PERT</th>
              <th colSpan="2">Gaussian</th>
              <th colSpan="4">PERT</th>
              <th colSpan="4">Gaussian</th>
            </tr>
            <tr>
              <th>Min</th>
              <th>Max</th>
              <th>Mode</th>
              <th>Height</th>
              <th>Mean</th>
              <th>Std. dev.</th>
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
          <tbody>{features}</tbody>
        </table>
      </div>
    );
  }
}

export default FeatureList;
