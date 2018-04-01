import PERT from './curves/PERT';
import Gaussian from './curves/Gaussian';

var CurveRegistry = {
  PERT: PERT,
  Gaussian: Gaussian,
};

export default CurveRegistry;
