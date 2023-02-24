const cloneDeepObject = require('../clone_object.js');

describe('cloneDeepObject', () => {
  it('returns object type', () => {
    const obj = {
      a: 1,
      b: '가',
    };

    expect(typeof cloneDeepObject(obj)).toBe('object');
  });

  it('throws error if parameter type is not object', () => {
    const number = 1;
    const string = '가';
    const boolean = true;

    expect(() => {
      cloneDeepObject(number);
    }).toThrow();

    expect(() => {
      cloneDeepObject(string);
    }).toThrow();

    expect(() => {
      cloneDeepObject(boolean);
    }).toThrow();
  });

  it('return value is not same as parameter value', () => {
    const obj = {
      a: 1,
      b: {
        c: 1,
      },
      c: ['1'],
    };
    expect(cloneDeepObject(obj)).not.toBe(obj);
  });

  it('return deep copy of parameter', () => {
    const obj = {
      a: 1,
      b: {
        c: 1,
      },
      c: true,
    };
    expect(cloneDeepObject(obj).b).not.toBe(obj.b);
  });

  it('return deep copy of array parameter', () => {
    const array = [1, 2, 3];

    const result = cloneDeepObject(array);
    expect(Array.isArray(result)).toBe(true);
  });
});
