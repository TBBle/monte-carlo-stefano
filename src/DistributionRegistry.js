import PERT from './distributions/PERT';
import Gaussian from './distributions/Gaussian';

var DistributionRegistry = {
  PERT: PERT,
  Gaussian: Gaussian,
};

export default DistributionRegistry;
