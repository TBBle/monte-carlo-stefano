import PD from 'probability-distributions';

class PERT {
  constructor({ minimum, maximum, mode, height = 4 }) {
    // Calculate parameters for the beta-curve
    // Reference https://www.riskamp.com/beta-pert#the-beta-pert-distribution-in-r
    // Handy, since the probability-distributions code provides the same API as R

    const range = maximum - minimum;
    const mu = (minimum + maximum + height * mode) / (height + 2);
    var v;
    if (mu === mode) {
      v = height / 2 + 1;
    } else {
      v =
        (mu - minimum) * (2 * mode - minimum - maximum) / ((mode - mu) * range);
    }

    const w = v * (maximum - mu) / (mu - minimum);

    // Variables we need for the sampling
    this.betaParams = {
      v: v,
      w: w,
      range: range,
      minimum: minimum,
    };
  }

  sample() {
    var { v, w, range, minimum } = this.betaParams;
    return PD.rbeta(1, v, w)[0] * range + minimum;
  }
}

export default PERT;
