import React, { Component } from 'react';
import './App.css';
import EpicDisplay from './EpicDisplay';
import FeatureDisplay from './FeatureDisplay';
import { generateResults } from './data';

class App extends Component {
  render() {
    const FEATURES = [
      {
        size: 'XS',
        parameters: {
          PERT: { minimum: 4, mode: 5, maximum: 10, height: 24 },
          Gaussian: { mean: 5, sd: 0.5 },
        },
      },
      {
        size: 'S',
        parameters: {
          PERT: { minimum: 7, mode: 9, maximum: 25, height: 15 },
          Gaussian: { mean: 9, sd: 0.9 },
        },
      },
      {
        size: 'M',
        parameters: {
          PERT: { minimum: 15, mode: 16, maximum: 40, height: 8 },
          Gaussian: { mean: 16, sd: 1.6 },
        },
      },
      {
        size: 'L',
        parameters: {
          PERT: { minimum: 25, mode: 30, maximum: 60, height: 4 },
          Gaussian: { mean: 30, sd: 3 },
        },
      },
      {
        size: 'XL',
        parameters: {
          PERT: { minimum: 50, mode: 50, maximum: 100, height: 1 },
          Gaussian: { mean: 52, sd: 5.2 },
        },
      },
    ];

    const EPICS = [
      { id: 1, features: [1, 0, 0, 0, 0] },
      { id: 2, features: [0, 1, 0, 0, 0] },
      { id: 3, features: [0, 0, 1, 0, 0] },
      { id: 4, features: [0, 0, 0, 1, 0] },
      { id: 5, features: [0, 0, 0, 0, 1] },
      { id: 6, features: [1, 1, 1, 1, 1] },
    ];

    const RESULTS = generateResults(FEATURES, EPICS);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stefano's Monte Carlo thing</h1>
        </header>
        <div className="App-left">
          <EpicDisplay
            features={FEATURES}
            epics={EPICS}
            results={RESULTS.epics}
          />
        </div>
        <div className="App-right">
          <FeatureDisplay features={FEATURES} results={RESULTS.features} />
        </div>
      </div>
    );
  }
}

export default App;
