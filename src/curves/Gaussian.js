import React from 'react';
import Curve from '../Curve';

class Gaussian extends Curve {
  renderParams = () => {
    const parameters = this.props.curve.parameters;
    return (
      <td>
        mean = {parameters.mean}, sd = {parameters.sd}
      </td>
    );
  };

  renderResult = () => {
    return <td>Result here</td>;
  };
}

export default Gaussian;
