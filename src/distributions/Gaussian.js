class Gaussian {
  constructor({ mean, sd }) {
    this.mean = mean;
    this.sd = sd;
  }

  sample() {
    return this.mean;
  }
}

export default Gaussian;
