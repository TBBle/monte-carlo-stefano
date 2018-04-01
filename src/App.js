import React, { Component } from 'react';
import './App.css';
import EpicDisplay from './EpicDisplay';
import CurveDisplay from './CurveDisplay';

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

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stefano's Monte Carlo thing</h1>
        </header>
        <div className="App-left">
          <EpicDisplay curves={CURVES} />
        </div>
        <div className="App-right">
          <CurveDisplay curves={CURVES} />
        </div>
      </div>
    );
  }
}

export default App;
