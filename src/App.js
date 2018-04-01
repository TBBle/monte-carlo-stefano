import React, { Component } from 'react';
import './App.css';
import EpicDisplay from './EpicDisplay';
import CurveDisplay from './CurveDisplay';
import DistributionRegistry from './DistributionRegistry';

class App extends Component {
  render() {
    const CURVES = [
      {
        size: 'L',
        distribution: 'PERT',
        parameters: { minimum: 1, maximum: 5, mode: 2 },
      },
      { size: 'L', distribution: 'Gaussian', parameters: { mean: 3, sd: 1 } },
    ];

    const EPICS = [
      { id: 1, curves: [2, 0] },
      { id: 2, curves: [0, 2] },
      { id: 3, curves: [1, 1] },
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
    const ITERATIONS = 100; // TODO: 10k

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
