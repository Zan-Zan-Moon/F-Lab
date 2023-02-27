const {
  cloneDeepObjectTypeValue,
  cloneDeepArray,
  cloneDeepObject,
} = require('../clone_object.js');

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
    const obj = { number: 1, object: { number1: 1 } };

    const copyObj = { ...obj };

    const copyDeepObj = cloneDeepObject(obj);

    expect(copyObj.object).toBe(obj.object);

    expect(copyDeepObj.object).not.toBe(obj.object);
  });

  it('return deep clone object that includes array value', () => {
    const obj = { number: 1, array: [1, 2] };

    const copyObj = { ...obj };

    const copyDeepObj = cloneDeepObject(obj);

    expect(copyObj.array).toBe(obj.array);

    expect(copyDeepObj.array).not.toBe(obj.array);
  });
});

describe('cloneDeepObjectTypeValue', () => {
  it('returns object type', () => {
    const obj = {
      number: 1,
      string: '가',
    };

    const typeOfcloneObject = typeof cloneDeepObjectTypeValue(obj);

    expect(typeOfcloneObject).toBe('object');
  });

  it('throws error if parameter type is not object', () => {
    const number = 1;
    const string = '가';
    const boolean = true;

    expect(() => {
      cloneDeepObjectTypeValue(number);
    }).toThrow();

    expect(() => {
      cloneDeepObjectTypeValue(string);
    }).toThrow();

    expect(() => {
      cloneDeepObjectTypeValue(boolean);
    }).toThrow();
  });

  it('return value that is not same as parameter value', () => {
    const obj = {
      number: 1,
      object: {
        number: 1,
      },
      array: ['1'],
    };

    const deepcopiedObject = cloneDeepObjectTypeValue(obj);

    expect(deepcopiedObject).not.toBe(obj);
  });

  it('return deep copy of obj parameter', () => {
    const obj = {
      number: 1,
      object: {
        number: 1,
      },
      boolean: true,
    };

    const deepcopiedObject = cloneDeepObjectTypeValue(obj);

    expect(deepcopiedObject.object).not.toBe(obj.object);
  });

  it('return deep copy of array parameter', () => {
    const array = [{ number: 1 }, 2, 3];

    const copiedArray = [...array];

    const deepcopiedArray = cloneDeepObjectTypeValue(array);

    expect(Array.isArray(deepcopiedArray)).toBe(true);
    expect(copiedArray[0]).toBe(array[0]);
    expect(deepcopiedArray[0]).not.toBe(array[0]);
  });

  it('deep copy object that has object and array properties', () => {
    const obj = {
      number: 1,
      object: {
        string: '가',
      },
      array: { array1: [1, 2, { number: 2, array2: [2, 3] }] },
    };

    const newObj = obj;
    const weakCopyObj = { ...obj };
    const deepCopyObj = cloneDeepObjectTypeValue(obj);

    expect(newObj).toBe(obj);
    expect(deepCopyObj).not.toBe(obj);
    expect(weakCopyObj).not.toBe(obj);
    expect(weakCopyObj.object).toBe(obj.object);
    expect(weakCopyObj.array).toBe(obj.array);
    expect(deepCopyObj.object).not.toBe(obj.object);
    expect(deepCopyObj.array).not.toBe(obj.array);
  });

  it('return Date type of value', () => {
    const date = new Date();

    const cloneDate = cloneDeepObjectTypeValue(date);

    expect(date === cloneDate).toBe(true);
  });

  it('return Map type of value', () => {
    const map = new Map();

    const cloneMap = cloneDeepObjectTypeValue(map);

    expect(map === cloneMap).toBe(true);
  });
});
