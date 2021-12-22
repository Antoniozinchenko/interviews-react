/**
 *
 *
 * User going to report working hours, but doesn't know when will be day offs and vacations.
 * So our goal is to fix parseData method and return reporting data excluded vacations.
 *
 * Assumptions
 * - data and vacations arrays are already sorted and valid (don't have duplications or intersected elements inside)
 * - vacaion days can be included inside result
 *
 *
 * Example:
 * Input values:
 *      data:  [ [5, 15], [20, 30]  [40, 60] ]
 * vacations:  [ [10, 20], [25, 50] ]
 *
 *    result:  [ [5, 10], [20, 25], [50, 60] ]
 *
 */

/**
 * first element always LESS than second
 */
export type TimeRange = [number, number];

const compute = (
  result: TimeRange[],
  item: TimeRange,
  vacations: TimeRange[]
): void => {
  if (vacations.length === 0) {
    result.push(item);
  } else {
    const vacation = vacations[0];
    if (vacation[1] <= item[0]) {
      // vacation is before
      vacations.shift();
      compute(result, item, vacations);
    } else if (item[1] <= vacation[0]) {
      // vacation is after item
      result.push(item);
    } else if (item[0] >= vacation[0] && item[1] >= vacation[1]) {
      //vacation is intersects at start
      vacations.shift();
      compute(result, [vacation[1], item[1]], vacations);
    } else if (item[0] <= vacation[0] && item[1] <= vacation[1]) {
      // vacation intersect at end
      result.push([item[0], vacation[0]]);
    } else if (item[0] <= vacation[0] && item[1] >= vacation[1]) {
      // vacation is fully  included inside item
      result.push([item[0], vacation[0]]);
      vacations.shift();
      compute(result, [vacation[1], item[1]], vacations);
    }
  }
};

export const parseData = (
  data: TimeRange[],
  vacations: TimeRange[]
): TimeRange[] => {
  const vacationsCopy = [...vacations];
  const result: TimeRange[] = [];

  data.forEach((item) => {
    compute(result, item, vacationsCopy);
  });

  return result;
};
