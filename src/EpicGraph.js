import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import './EpicGraph.css';

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#A_better_solution
function round(number, precision) {
  var shift = function(number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ('' + number).split('e');
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

class EpicGraph extends Component {
  render() {
    const epic = this.props.epics[this.props.selected];
    const results = this.props.results[this.props.selected];
    const resultList = [];
    results.forEach((result, index) => {
      resultList.push(<li key={index}>{result}</li>);
    });
    return (
      <div className="EpicGraph">
        <p>Rendering Epic {epic.id}</p>
        {/* Hide ReactEcharts from Jest, see https://github.com/apache/incubator-echarts/issues/6575 */
        typeof jest === 'undefined' ? (
          <ReactEcharts option={this.getOption()} />
        ) : null}
        <ul style={{ display: 'none' }}>{resultList}</ul>
      </div>
    );
  }

  getOption() {
    const results = this.props.results[this.props.selected];

    const roundedValues = results.map(x => round(x, 1));
    const counts = this.countHits(roundedValues);

    // echarts datasets row-based key-value format
    // https://ecomfe.github.io/echarts-doc/public/en/option.html#dataset.source

    const dataset = counts.map(([length, count]) => ({
      length: length,
      count: count,
    }));

    return {
      legend: {},
      tooltip: {},
      dataset: {
        source: dataset,
        dimensions: ['length', 'count'],
      },
      xAxis: { type: 'value' },
      yAxis: {},
      series: { type: 'bar' },
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

export default EpicGraph;
