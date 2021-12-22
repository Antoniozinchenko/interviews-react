import { parseData, TimeRange } from ".";

test("Vatacion is BEFORE requested data", () => {
  /**
   *
   * Vacation: |***|
   *     Data:      |-----|
   * Expected:      |-----|
   *
   */

  const vacations: TimeRange[] = [[0, 1]];
  const data: TimeRange[] = [[5, 10]];
  const result: TimeRange[] = [[5, 10]];
  expect(parseData(data, vacations)).toEqual(result);
});

test("Vatacion is AFTER requested data", () => {
  /**
   *
   * Vacation:          |****|
   *     Data:  |-----|
   * Expected:  |-----|
   *
   */
  const vacations: TimeRange[] = [[10, 11]];
  const data: TimeRange[] = [[5, 10]];
  const result: TimeRange[] = [[5, 10]];
  expect(parseData(data, vacations)).toEqual(result);
});

test("Vatacion is INTERSECTS data at end date", () => {
  /**
   *
   * Vacation:      |**************|
   *     Data: |-----------|
   * Expected: |----|
   *
   */
  const vacations: TimeRange[] = [[6, 11]];
  const data: TimeRange[] = [[3, 10]];
  const result: TimeRange[] = [[3, 6]];
  expect(parseData(data, vacations)).toEqual(result);
});

test("Vatacion is INTERSECTS data at start date", () => {
  /**
   *
   * Vacation: |**************|
   *     Data:         |-----------|
   * Expected:                |----|
   *
   */
  const vacations: TimeRange[] = [[0, 6]];
  const data: TimeRange[] = [[3, 10]];
  const result: TimeRange[] = [[6, 10]];
  expect(parseData(data, vacations)).toEqual(result);
});

test("Vatacion is FULLY OVERLAYS multiple requested data", () => {
  /**
   *
   * Vacation: |***********************|
   *     Data:    |--|  |---|    |----------|
   * Expected:                         |----|
   *
   */
  const vacations: TimeRange[] = [
    [0, 20],
    [22, 30],
  ];
  const data: TimeRange[] = [
    [3, 10],
    [15, 16],
    [18, 25],
  ];
  const result: TimeRange[] = [[20, 22]];
  expect(parseData(data, vacations)).toEqual(result);
});

test("Vatacion is FULLY OVERLAYS data", () => {
  /**
   *
   * Vacation: |**************|
   *     Data:    |-------|
   * Expected:
   *
   */
  const vacations: TimeRange[] = [[0, 11]];
  const data: TimeRange[] = [[3, 10]];
  const result: TimeRange[] = [];
  expect(parseData(data, vacations)).toEqual(result);
});

test("multiple Vatacions is FULLY INCLUDED inside data", () => {
  /**
   *
   * Vacation:      |***|   |*****|     |******|
   *     Data:   |--------------------------|
   * Expected:   |--|   |---|     |-----|
   *
   */

  const vacations: TimeRange[] = [
    [5, 11],
    [16, 25],
  ];
  const data: TimeRange[] = [[0, 20]];
  const result: TimeRange[] = [
    [0, 5],
    [11, 16],
  ];
  expect(parseData(data, vacations)).toEqual(result);
});


test("Combined data and vacations", () => {
  /**
   *
   * Vacation:      |************|   |********|  
   *     Data:   |--------|  |----------|  |---------|
   * Expected:   |--|            |---|        |------|
   *
   */

  const vacations: TimeRange[] = [ [10, 20], [25, 50] ];
  const data: TimeRange[] = [ [5, 15], [20, 30],  [40, 60] ];
  const result: TimeRange[] = [ [5, 10], [20, 25], [50, 60] ];
  expect(parseData(data, vacations)).toEqual(result);
});

test("zero Vatacions", () => {
  const vacations: TimeRange[] = [];
  const data: TimeRange[] = [[0, 20]];
  const result: TimeRange[] = [[0, 20]];
  expect(parseData(data, vacations)).toEqual(result);
});

test("zero requested data", () => {
  const vacations: TimeRange[] = [[0, 20]];
  const data: TimeRange[] = [];
  const result: TimeRange[] = [];
  expect(parseData(data, vacations)).toEqual(result);
});
