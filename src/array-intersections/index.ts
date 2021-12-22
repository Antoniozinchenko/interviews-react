/**
 * 
 * 
 * User is going to report working hours, but doesn't know when will be day offs and vacations.
 * So our goal is to fix parseData method and return reporting data excluded vacations.
 * 
 * Assumptions
 * - data and vacations arrays are already sorted and valid (don't have duplications or intersected elements inside)
 * - vacaion start and end days can be included inside result
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

export const parseData = (
  data: TimeRange[],
  vacations: TimeRange[]
): TimeRange[] => {
  let result: TimeRange[] = [];

  // TODO: need implementation

  return result;
};
