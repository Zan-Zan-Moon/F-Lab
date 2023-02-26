const {
  cloneObject,
  cloneDeepArray,
  cloneDeepObject,
} = require('../clone_object.js');

describe('cloneDeepObject', () => {
  it('returns object type', () => {
    const obj = {
      a: 1,
      b: '가',
    };

    expect(typeof cloneObject(obj)).toBe('object');
  });

  it('throws error if parameter type is not object', () => {
    const number = 1;
    const string = '가';
    const boolean = true;

    expect(() => {
      cloneObject(number);
    }).toThrow();

    expect(() => {
      cloneObject(string);
    }).toThrow();

    expect(() => {
      cloneObject(boolean);
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
    expect(cloneObject(obj)).not.toBe(obj);
  });

  it('return deep copy of obj parameter', () => {
    const obj = {
      a: 1,
      b: {
        c: 1,
      },
      c: true,
    };
    expect(cloneObject(obj).b).not.toBe(obj.b);
  });

  it('return deep copy of array parameter', () => {
    const array = [{ a: 1 }, 2, 3];
    const b = array;

    const result = cloneObject(array);

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

    const deepCopyObj = cloneObject(obj);

    expect(cobyObj).toBe(obj);
    expect(deepCopyObj).toStrictEqual(obj);
    expect(deepCopyObj).not.toBe(obj);
    expect(weakCopyObj).not.toBe(obj);
    expect(weakCopyObj.b).toBe(obj.b);
    expect(weakCopyObj.c).toBe(obj.c);
    expect(deepCopyObj.b).not.toBe(obj.b);
    expect(deepCopyObj.c).not.toBe(obj.c);
  });

  it('return Date type of value', () => {
    const date = new Date();

    const cloneDate = cloneObject(date);

    expect(date === cloneDate).toBe(true);
  });

  it('return Map type of value', () => {
    const map = new Map();

    const cloneMap = cloneObject(map);

    expect(map === cloneMap).toBe(true);
  });
});

describe('cloneDeepArray', () => {
  it('return deep clone array', () => {
    const arr = [[1, 2], 2, 3];

    const copyArr = [...arr];

    const copyDeepArr = cloneDeepArray(arr);

    expect(arr[0]).toBe(copyArr[0]);

    expect(arr[0]).not.toBe(copyDeepArr[0]);
  });

  it('return deep clone array that includes object value', () => {
    const arr = [{ a: 1 }, { b: [1, 2] }, 3];

    const copyArr = [...arr];

    const copyDeepArr = cloneDeepArray(arr);

    expect(arr[0]).toBe(copyArr[0]);

    expect(arr[0]).not.toBe(copyDeepArr[0]);

    expect(arr[1]).not.toBe(copyDeepArr[1]);
  });
});

describe('cloneDeepOject', () => {
  it('return deep clone object', () => {
    const obj = { a: 1, b: { c: 1 } };

    const copyObj = { ...obj };

    const copyDeepObj = cloneDeepObject(obj);

    expect(copyObj.b).toBe(obj.b);

    expect(copyDeepObj.b).not.toBe(obj.b);
  });

  it('return deep clone object that includes array value', () => {
    const obj = { a: 1, b: [1, 2] };

    const copyObj = { ...obj };

    const copyDeepObj = cloneDeepObject(obj);

    expect(copyObj.b).toBe(obj.b);

    expect(copyDeepObj.b).not.toBe(obj.b);
  });
});
