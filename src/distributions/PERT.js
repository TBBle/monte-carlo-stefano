class PERT {
  constructor({ minimum, maximum, mode }) {
    this.minimum = minimum;
    this.maximum = maximum;
    this.mode = mode;
  }

  sample() {
    return this.mode;
  }
}

export default PERT;
