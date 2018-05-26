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
      );
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
      });
    }
    epicResults.push(epicResult);
  }

  return { curves: curveResults, epics: epicResults };
}

export { generateResults };
