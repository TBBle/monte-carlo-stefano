import React, { Component } from 'react';
import Graph from './Graph';
import FeatureList from './FeatureList';

class FeatureDisplay extends Component {
  render() {
    const selected = 0;
    const features = this.props.features;
    const results = this.props.results;
    const selectedFeatures = features[selected];
    const selectedResults = results[selected];

    const featureGraphs = [];
    for (const distributionName in selectedResults) {
      const label =
        'Feature: ' + selectedFeatures.size + ' (' + distributionName + ')';
      featureGraphs.push(
        <Graph
          key={distributionName}
          label={label}
          results={selectedResults[distributionName]}
        />
      );
    }

    return (
      <div className="FeatureDisplay">
        {featureGraphs}
        <FeatureList
          features={features}
          results={results}
          selected={selected}
        />
      </div>
    );
  }
}

export default FeatureDisplay;
