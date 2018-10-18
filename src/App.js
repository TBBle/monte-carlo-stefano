import React, { Component } from 'react';
import styles from './App.module.scss';
import ProjectDisplay from './ProjectDisplay';
import EpicDisplay from './EpicDisplay';

class App extends Component {
  render() {
    // Future state
    const EPICS = [
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
          Gaussian: { mean: 50, sd: 5 },
        },
      },
    ];

    return (
      <div className={styles.App}>
        <header className={styles.header}>
          <h1 className={styles.title}>Stefano's Monte Carlo</h1>
        </header>
        <div className={styles.left}>
          <ProjectDisplay epics={EPICS} />
        </div>
        <div className={styles.right}>
          <EpicDisplay epics={EPICS} />
        </div>
      </div>
    );
  }
}

export default App;
