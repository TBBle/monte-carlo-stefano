import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { round, percentile } from './data';

import './Graph.css';

class Graph extends Component {
  render() {
    return (
      <div className="Graph">
        <p>Rendering {this.props.label}</p>
        <ReactEcharts style={{ height: '600px' }} option={this.getOption()} />
      </div>
    );
  }

  getOption() {
    const pertResults = this.props.results['PERT'];
    const pertRoundedValues = pertResults.map(x => round(x, 1));
    const pertPercentages = this.countHitsAsPercentage(pertRoundedValues);
    const pertMarkLines = this.generateMarkLines(pertResults);

    const gaussianResults = this.props.results['Gaussian'];
    const gaussianRoundedValues = gaussianResults.map(x => round(x, 1));
    const gaussianPercentages = this.countHitsAsPercentage(
      gaussianRoundedValues
    );
    const gaussianMarkLines = this.generateMarkLines(gaussianResults);

    const minLength = Math.min(...pertRoundedValues, ...gaussianRoundedValues);
    const maxLength = Math.max(...pertRoundedValues, ...gaussianRoundedValues);

    return {
      legend: {},
      tooltip: {},
      dataset: [
        {
          source: pertPercentages,
          dimensions: ['length', 'PERT'],
        },
        {
          source: gaussianPercentages,
          dimensions: ['length', 'Gaussian'],
        },
      ],
      grid: [{ height: '30%' }, { bottom: '10%', height: '30%' }],
      xAxis: [
        { type: 'value', min: minLength, max: maxLength },
        { type: 'value', gridIndex: 1, min: minLength, max: maxLength },
      ],
      yAxis: [{}, { gridIndex: 1 }],
      series: [
        {
          type: 'bar',
          markLine: { lineStyle: { color: 'black' }, data: pertMarkLines },
        },
        {
          type: 'bar',
          datasetIndex: 1,
          xAxisIndex: 1,
          yAxisIndex: 1,
          markLine: { lineStyle: { color: 'black' }, data: gaussianMarkLines },
        },
      ],
    };
  }

  countHitsAsPercentage(values) {
    // https://stackoverflow.com/a/35101824/166389
    // Although returns the list of key/value pairs, not a Map
    const count = values.length;
    return [...new Set(values)].map(x => [
      x,
      values.filter(y => y === x).length * 100 / count,
    ]);
  }

  generateMarkLines(values) {
    const percentiles = [3, 50, 80, 97];
    const percentileLabels = ['3rd', '50th', '80th', '97th'];

    const result = [];
    percentiles.forEach((percentileValue, index) => {
      const value = round(percentile(values, percentileValue), 1);
      result.push([
        { xAxis: value, yAxis: 'min', name: percentileLabels[index] },
        { xAxis: value, yAxis: 'max' },
      ]);
    });
    return result;
  }
}

export default Graph;
