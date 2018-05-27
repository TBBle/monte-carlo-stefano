import DistributionRegistry from './DistributionRegistry';

const ITERATIONS = 2000;

function distributions(curve) {
  const result = {};
  const parametersObject = curve['parameters'];
  for (const distributionName in parametersObject) {
    const parameters = parametersObject[distributionName];
    result[distributionName] = new DistributionRegistry[distributionName](
      parameters
    );
  }
  return result;
}

function generateResults(curves, epics) {
  // Lots of numbers: A batch for each curve, and then a batch for each epic.

  const curveResults = [];
  for (const curve of curves) {
    const curveResult = {};
    const curveDistributions = distributions(curve);
    for (const distributionName in curveDistributions) {
      const distribution = curveDistributions[distributionName];
      curveResult[distributionName] = Array.from({ length: ITERATIONS }, () =>
        distribution.sample()
      ).sort(function(a, b) {
        return a - b;
      });
    }
    curveResults.push(curveResult);
  }

  const epicResults = [];
  for (const epic of epics) {
    const epicDistributions = {};
    for (const [curveIndex, count] of epic['curves'].entries()) {
      const curve = curves[curveIndex];
      const curveDistributions = distributions(curve);
      for (const distributionName in curveDistributions) {
        const distribution = curveDistributions[distributionName];
        if (!(distributionName in epicDistributions)) {
          epicDistributions[distributionName] = [];
        }
        for (var i = 0; i < count; i++) {
          epicDistributions[distributionName].push(distribution);
        }
      }
    }
    const epicResult = {};
    for (const distributionName in epicDistributions) {
      const distributions = epicDistributions[distributionName];
      epicResult[distributionName] = Array.from({ length: ITERATIONS }, () => {
        return distributions.reduce((accumulator, distribution) => {
          return accumulator + distribution.sample();
        }, 0);
      }).sort(function(a, b) {
        return a - b;
      });
    }
    epicResults.push(epicResult);
  }

  return { curves: curveResults, epics: epicResults };
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#A_better_solution
function round(number, precision) {
  var shift = function(number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ('' + number).split('e');
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

// Based on https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method
function percentile(array, percentile) {
  if (percentile <= 0) {
    return array[0];
  }
  if (percentile >= 100) {
    return array[array.length - 1];
  }
  const rank = Math.ceil(percentile / 100 * array.length);
  return array[rank];
}

export { generateResults, round, percentile };
