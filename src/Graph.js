import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { round, percentile } from './data';

import styles from './Graph.module.scss';

function tooltipValueFormatter(params) {
  return params.seriesName + ': ' + params.value[1] + '%';
}

function tooltipFormatter(paramsList) {
  // Ordering in the tool tip varies by which graph we're over
  const pertFirst = paramsList[0].seriesName === 'PERT';
  const pertParams = paramsList[pertFirst ? 0 : 1];
  const gaussianParams = paramsList[pertFirst ? 1 : 0];
  return (
    '' +
    pertParams.value[0] +
    ' days:<br/>' +
    tooltipValueFormatter(pertParams) +
    '<br/>' +
    tooltipValueFormatter(gaussianParams)
  );
}

class Graph extends Component {
  render() {
    return (
      <div className={styles.graph}>
        <p>Rendering {this.props.label}</p>
        <ReactEcharts style={{ height: '600px' }} option={this.getOption()} />
      </div>
    );
  }

  getOption() {
    const pertResults = this.props.results['PERT'];
    const pertRoundedValues = pertResults.map(x => round(x, 0));
    const pertPercentages = this.countHitsAsPercentage(pertRoundedValues);
    const pertGrid = { top: '10%', bottom: '40%', height: '30%' };
    const pertMarkLines = this.generateMarkLines(
      pertResults,
      pertGrid['bottom'],
      pertGrid['top']
    );

    const gaussianResults = this.props.results['Gaussian'];
    const gaussianRoundedValues = gaussianResults.map(x => round(x, 0));
    const gaussianPercentages = this.countHitsAsPercentage(
      gaussianRoundedValues
    );
    const gaussianGrid = { top: '60%', bottom: '90%', height: '30%' };
    const gaussianMarkLines = this.generateMarkLines(
      gaussianResults,
      gaussianGrid['bottom'],
      gaussianGrid['top']
    );

    const minLength = Math.min(...pertRoundedValues, ...gaussianRoundedValues);
    const maxLength = Math.max(...pertRoundedValues, ...gaussianRoundedValues);

    return {
      legend: { selectedMode: false },
      tooltip: {
        trigger: 'axis',
        formatter: tooltipFormatter,
      },
      axisPointer: {
        link: { xAxisIndex: 'all' },
      },
      dataset: [
        {
          source: pertPercentages,
          dimensions: [null, 'PERT'],
        },
        {
          source: gaussianPercentages,
          dimensions: [null, 'Gaussian'],
        },
      ],
      grid: [pertGrid, gaussianGrid],
      xAxis: [
        {
          type: 'value',
          min: minLength,
          max: maxLength,
          axisPointer: { show: true },
          axisLabel: { formatter: '{value}d' },
        },
        {
          type: 'value',
          gridIndex: 1,
          min: minLength,
          max: maxLength,
          axisPointer: { show: true },
          axisLabel: { formatter: '{value}d' },
        },
      ],
      yAxis: [
        { axisLabel: { formatter: '{value}%' } },
        { gridIndex: 1, axisLabel: { formatter: '{value}%' } },
      ],
      series: [
        {
          type: 'bar',
          markLine: {
            lineStyle: { color: 'black' },
            silent: true,
            data: pertMarkLines,
          },
        },
        {
          type: 'bar',
          datasetIndex: 1,
          xAxisIndex: 1,
          yAxisIndex: 1,
          markLine: {
            lineStyle: { color: 'black' },
            silent: true,
            data: gaussianMarkLines,
          },
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
      (values.filter(y => y === x).length * 100) / count,
    ]);
  }

  generateMarkLines(values, minY, maxY) {
    const percentiles = [3, 50, 80, 97];
    const percentileLabels = ['3rd', '50th', '80th', '97th'];

    const result = [];
    percentiles.forEach((percentileValue, index) => {
      const value = round(percentile(values, percentileValue), 0);
      result.push([
        { xAxis: value, y: minY, name: percentileLabels[index] },
        { xAxis: value, y: maxY },
      ]);
    });
    return result;
  }
}

export default Graph;
