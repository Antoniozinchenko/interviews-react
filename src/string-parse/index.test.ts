import { findStrings } from ".";

test('Input is { [key: string]: string; }', () => {
  const input = {
    field1: 'My message 1',
    field2: 'My message 2',
    field3: 'My message 3',
    field4: 'My message 4',
  };
  expect(findStrings(input)).toEqual(['My message 1','My message 2', 'My message 3', 'My message 4']);
});

test('parse strings in array and object property', () => {
  const input = {
    field1: [
      'Message in array',
    ],
    field2: {
      nestedField2: 'Message in nested field'
    }
  };

  const output = ['Message in array', 'Message in nested field'];

  expect(findStrings(input)).toEqual(output);
});

test('parse complex object with different types of properties', () => {
  const input = {
    field1: {
      0: {
        error: 'Error Message',
        segments: {
          0: {
            field_required: ['This is required field'],
            someValue: 1
          },
          1: null,
          2: 'Additional message'
        }
      },
      1: {
        field2: true
      }
    }
  };

  const output = ['Error Message', 'This is required field', 'Additional message'];
  expect(findStrings(input)).toEqual(output);
});

test('input is undefined', () => {
  expect(findStrings({})).toEqual([]);
  expect(findStrings(null)).toEqual([]);
});

test('input is empty array', () => {
  expect(findStrings([])).toEqual([]);
});

test('input is string', () => {
  expect(findStrings('My message')).toEqual(['My message']);
});
