import PD from 'probability-distributions';

class Gaussian {
  constructor({ mean, sd }) {
    this.mean = mean;
    this.sd = sd;
  }

  sample() {
    return PD.rnorm(1, this.mean, this.sd)[0];
  }
}

export default Gaussian;
