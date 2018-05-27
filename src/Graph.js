import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { round, percentile } from './data';

import './Graph.css';

class Graph extends Component {
  render() {
    const results = this.props.results;
    const resultList = [];
    results.forEach((result, index) => {
      resultList.push(<li key={index}>{result}</li>);
    });
    return (
      <div className="Graph">
        <p>Rendering {this.props.label}</p>
        <ReactEcharts option={this.getOption()} />
        <ul style={{ display: 'none' }}>{resultList}</ul>
      </div>
    );
  }

  getOption() {
    const results = this.props.results;

    const roundedValues = results.map(x => round(x, 1));
    const counts = this.countHits(roundedValues);

    // echarts datasets row-based key-value format
    // https://ecomfe.github.io/echarts-doc/public/en/option.html#dataset.source

    const dataset = counts.map(([length, count]) => ({
      length: length,
      count: count,
    }));

    // Insert percentile markers
    const markLineData = [];
    const percentiles = [3, 50, 80, 97];
    const percentileLabels = ['3rd', '50th', '80th', '97th'];
    percentiles.forEach((percentileValue, index) => {
      const value = round(percentile(results, percentileValue), 1);
      markLineData.push([
        { xAxis: value, yAxis: 'min', name: percentileLabels[index] },
        { xAxis: value, yAxis: 'max' },
      ]);
    });

    return {
      legend: {},
      tooltip: {},
      dataset: {
        source: dataset,
        dimensions: ['length', 'count'],
      },
      xAxis: { type: 'value' },
      yAxis: {},
      series: {
        type: 'bar',
        markLine: { lineStyle: { color: 'black' }, data: markLineData },
      },
    };
  }

  countHits(values) {
    // https://stackoverflow.com/a/35101824/166389
    // Although returns the list of key/value pairs, not a Map
    return [...new Set(values)].map(x => [
      x,
      values.filter(y => y === x).length,
    ]);
  }
}

export default Graph;
