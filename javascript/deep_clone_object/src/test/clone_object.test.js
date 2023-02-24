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

  it('return deep copy of obj parameter', () => {
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
    const b = array;

    const result = cloneDeepObject(array);

    expect(Array.isArray(result)).toBe(true);
    expect(result).not.toBe(array);
  });

  it('copy 중복 객체, 배열', () => {
    const obj = {
      a: 1,
      b: {
        c: 1,
      },
      c: { a: [1, 2, { a: 2, b: [2, 3] }] },
    };

    const cobyObj = obj;
    const weakCopyObj = {};
    weakCopyObj.a = obj.a;
    weakCopyObj.b = obj.b;
    weakCopyObj.c = obj.c;

    const deepCopyObj = cloneDeepObject(obj);

    expect(cobyObj).toBe(obj);
    expect(deepCopyObj).toStrictEqual(obj);
    expect(deepCopyObj).not.toBe(obj);
    expect(weakCopyObj).not.toBe(obj);
    expect(weakCopyObj.b).toBe(obj.b);
    expect(weakCopyObj.c).toBe(obj.c);
    expect(deepCopyObj.b).not.toBe(obj.b);
    expect(deepCopyObj.c).not.toBe(obj.c);
  });
});
