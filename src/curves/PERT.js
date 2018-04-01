import React from 'react';
import Curve from '../Curve';

class PERT extends Curve {
  renderParams() {
    const parameters = this.props.curve.parameters;
    return (
      <td>
        minimum = {parameters.minimum}, maximum = {parameters.maximum}, mode ={' '}
        {parameters.mode}
      </td>
    );
  }

  renderResult() {
    return <td>Result here</td>;
  }
}

export default PERT;
