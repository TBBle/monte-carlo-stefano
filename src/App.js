import React, { Component } from 'react';
import './App.css';
import EpicDisplay from './EpicDisplay';
import CurveDisplay from './CurveDisplay';
import DistributionRegistry from './DistributionRegistry';

class App extends Component {
  render() {
    const CURVES = [
      {
        size: 'XS',
        distribution: 'PERT',
        parameters: { minimum: 4, mode: 5, maximum: 10, height: 24 },
      },
      {
        size: 'S',
        distribution: 'PERT',
        parameters: { minimum: 7, mode: 9, maximum: 25, height: 15 },
      },
      {
        size: 'M',
        distribution: 'PERT',
        parameters: { minimum: 15, mode: 16, maximum: 40, height: 8 },
      },
      {
        size: 'L',
        distribution: 'PERT',
        parameters: { minimum: 25, mode: 30, maximum: 60, height: 4 },
      },
      {
        size: 'XL',
        distribution: 'PERT',
        parameters: { minimum: 50, mode: 50, maximum: 100, height: 1 },
      },
      {
        size: 'XS',
        distribution: 'Gaussian',
        parameters: { mean: 5, sd: 0.5 },
      },
      { size: 'S', distribution: 'Gaussian', parameters: { mean: 9, sd: 0.9 } },
      {
        size: 'M',
        distribution: 'Gaussian',
        parameters: { mean: 16, sd: 1.6 },
      },
      { size: 'L', distribution: 'Gaussian', parameters: { mean: 30, sd: 3 } },
      {
        size: 'XL',
        distribution: 'Gaussian',
        parameters: { mean: 52, sd: 5.2 },
      },
    ];

    const EPICS = [
      { id: 1, curves: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { id: 2, curves: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
      { id: 3, curves: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
      { id: 4, curves: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
      { id: 5, curves: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
      { id: 6, curves: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0] },
      { id: 7, curves: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
      { id: 8, curves: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
      { id: 9, curves: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
      { id: 10, curves: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
      { id: 11, curves: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
      { id: 12, curves: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1] },
    ];

    const RESULTS = this.generateResults(CURVES, EPICS);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stefano's Monte Carlo thing</h1>
        </header>
        <div className="App-left">
          <EpicDisplay curves={CURVES} epics={EPICS} results={RESULTS} />
        </div>
        <div className="App-right">
          <CurveDisplay curves={CURVES} results={RESULTS} />
        </div>
      </div>
    );
  }

  generateResults(curves, epics) {
    // Lots of numbers: A batch for each curve, and then a batch for each epic.
    const ITERATIONS = 2000;

    const curveResults = [];
    curves.forEach(curve => {
      const distribution = new DistributionRegistry[curve.distribution](
        curve.parameters
      );
      curveResults.push(
        Array.from({ length: ITERATIONS }, () => distribution.sample())
      );
    });

    const epicResults = [];
    epics.forEach(epic => {
      epicResults.push(
        Array.from({ length: ITERATIONS }, () => {
          const curveCounts = epic.curves;
          var sum = 0;
          curves.forEach((curve, index) => {
            const count = curveCounts[index];
            if (count === 0) {
              return;
            }
            const distribution = new DistributionRegistry[curve.distribution](
              curve.parameters
            );
            for (var i = 0; i < count; i++) {
              sum += distribution.sample();
            }
          });
          return sum;
        })
      );
    });

    return { curves: curveResults, epics: epicResults };
  }
}

export default App;
