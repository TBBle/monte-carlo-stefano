import DistributionRegistry from './DistributionRegistry';

const ITERATIONS = 2000;

function distributions(epic) {
  const result = {};
  const parametersObject = epic['parameters'];
  for (const distributionName in parametersObject) {
    const parameters = parametersObject[distributionName];
    result[distributionName] = new DistributionRegistry[distributionName](
      parameters
    );
  }
  return result;
}

function generateResults(epics, projects) {
  // Lots of numbers: A batch for each epic, and then a batch for each project.

  const epicResults = [];
  for (const epic of epics) {
    const epicResult = {};
    const epicDistributions = distributions(epic);
    for (const distributionName in epicDistributions) {
      const distribution = epicDistributions[distributionName];
      epicResult[distributionName] = Array.from({ length: ITERATIONS }, () =>
        distribution.sample()
      ).sort(function(a, b) {
        return a - b;
      });
    }
    epicResults.push(epicResult);
  }

  const projectResults = [];
  for (const project of projects) {
    const projectDistributions = {};
    for (const [epicIndex, count] of project['epics'].entries()) {
      const epic = epics[epicIndex];
      const epicDistributions = distributions(epic);
      for (const distributionName in epicDistributions) {
        const distribution = epicDistributions[distributionName];
        if (!(distributionName in projectDistributions)) {
          projectDistributions[distributionName] = [];
        }
        for (var i = 0; i < count; i++) {
          projectDistributions[distributionName].push(distribution);
        }
      }
    }
    const projectResult = {};
    for (const distributionName in projectDistributions) {
      const distributions = projectDistributions[distributionName];
      projectResult[distributionName] = Array.from(
        { length: ITERATIONS },
        () => {
          return distributions.reduce((accumulator, distribution) => {
            return accumulator + distribution.sample();
          }, 0);
        }
      ).sort(function(a, b) {
        return a - b;
      });
    }
    projectResults.push(projectResult);
  }

  return { epics: epicResults, projects: projectResults };
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
