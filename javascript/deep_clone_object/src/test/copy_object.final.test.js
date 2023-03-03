const deepCopy = require('../copy_object.final.js');

describe('copy object', () => {
  it('returns deep copy of simple object', () => {
    const object = { a: 1 };

    const deepCopiedObject = deepCopy(object);

    expect(deepCopiedObject).not.toBe(object);
  });

  it('returns deep copy of object that has nested object as porperty', () => {
    const object = { a: { b: 1 } };

    const weakCopiedObject = { ...object };
    const deepCopiedObject = deepCopy(object);

    expect(weakCopiedObject).not.toBe(object);
    expect(deepCopiedObject).not.toBe(object);
    expect(weakCopiedObject.b).toBe(object.b);
    expect(deepCopiedObject.b).toBe(deepCopiedObject.b);
  });

  it('returns deep copy of simple array', () => {
    const array = [1, 2, 3];

    const deepCopiedArray = deepCopy(array);

    expect(deepCopiedArray).not.toBe(array);
  });

  it('returns deep copy of array that includes various tpyes of data', () => {
    const array = [{ a: 1 }, ['b', { c: 1 }, new Date(), new Map()]];

    const weakCopiedArray = [...array];
    const deepCopiedArray = deepCopy(array);

    expect(weakCopiedArray).not.toBe(array);
    expect(deepCopiedArray).not.toBe(array);
    expect(weakCopiedArray[0]).toBe(array[0]);
    expect(deepCopiedArray[0]).not.toBe(array[0]);
  });

  it('returns deep copy of set', () => {
    const set = new Set([{ a: 1 }, [1, 2]]);

    const deepCopiedSet = deepCopy(set);
    const weakCopiedSet = new Set(set);

    expect(deepCopiedSet).not.toBe(set);
    expect(weakCopiedSet).not.toBe(set);
    expect([...weakCopiedSet][0]).toBe([...set][0]);
    expect([...deepCopiedSet][0]).not.toBe([...set][0]);
  });

  it('returns deep copy of map', () => {
    const map = new Map([
      ['a', { a: 1 }],
      [{ a: 1 }, { a: 2 }],
      [[1, 2], 3],
    ]);

    const deepCopiedMap = deepCopy(map);
    const weakCopiedMap = new Map(map);

    expect(weakCopiedMap).not.toBe(map);
    expect(weakCopiedMap.get('a')).toBe(map.get('a'));
    expect(deepCopiedMap).not.toBe(map);
    expect(deepCopiedMap.get('a')).not.toBe(map.get('a'));
  });

  it('returns deep copy of regexp', () => {
    const regexp = new RegExp();

    const deepCopiedRegexp = deepCopy(regexp);

    expect(deepCopiedRegexp).not.toBe(regexp);
  });

  it('returns deep copy of typedArray', () => {
    const buffer = new ArrayBuffer(8);
    const typedArray = new Int8Array(buffer);
    const typedArray1 = new Int8Array(typedArray);
    const typedArray2 = new Int16Array(buffer);
    const typedArray3 = new Int8Array(typedArray2);
    typedArray[0] = 32;

    console.log(typedArray1);
    console.log(typedArray);
    console.log(typedArray2);
    console.log(typedArray3 instanceof Int16Array);
  });
});
