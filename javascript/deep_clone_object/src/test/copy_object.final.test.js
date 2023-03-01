const deepCopy = require('../copy_object.final.js');

describe('copy object', () => {
  it('returns copy of simple object', () => {
    const object = { a: 1 };

    const deepCopiedObject = deepCopy(object);

    expect(deepCopiedObject).not.toBe(object);
  });

  it('returns copy of object that has nested object as porperty', () => {
    const object = { a: { b: 1 } };

    const weakCopiedObject = { ...object };
    const deepCopiedObject = deepCopy(object);

    expect(weakCopiedObject).not.toBe(object);
    expect(deepCopiedObject).not.toBe(object);
    expect(weakCopiedObject.b).toBe(object.b);
    expect(deepCopiedObject.b).toBe(deepCopiedObject.b);
  });

  it('returns copy of simple array', () => {
    const array = [1, 2, 3];

    const deepCopiedArray = deepCopy(array);

    expect(deepCopiedArray).not.toBe(array);
  });

  it('returns copy of array that includes various tpyes of data', () => {
    const array = [{ a: 1 }, ['b', { c: 1 }, new Date(), new Map()]];

    const weakCopiedArray = [...array];
    const deepCopiedArray = deepCopy(array);

    expect(weakCopiedArray).not.toBe(array);
    expect(deepCopiedArray).not.toBe(array);
    expect(weakCopiedArray[0]).toBe(array[0]);
    expect(deepCopiedArray[0]).not.toBe(array[0]);
  });
});
