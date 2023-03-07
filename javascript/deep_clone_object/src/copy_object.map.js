const isDate = (value) => value instanceof Date ?? false;
const isArray = (value) => Array.isArray(value);
const isSet = (value) => value instanceof Set ?? false;
const isMap = (value) => value instanceof Map ?? false;
const isObject = (value) => value instanceof Object ?? false;

const copyDate = (value) => {
  return new Date(value);
};

function copyArray(values) {
  return values.reduce((arr, item, i) => {
    arr[i] = deepCopy(item);
    return arr;
  }, []);
}

function copySet(value) {
  const setToArr = [...value];
  return new Set(copyArray(setToArr));
}

function copyMap(value) {
  const mapToArr = [...value];
  return new Map(copyArray(mapToArr));
}

function copyObject(value) {
  const obj = {};
  for (prop in value) {
    obj[prop] = deepCopy(value[prop]);
  }
  return obj;
}

const objectTypedMap = new Map([
  [isObject, copyObject],
  [isDate, copyDate],
  [isArray, copyArray],
  [isSet, copySet],
  [isMap, copyMap],
]);

const deepCopy = (value) => {
  let result = value;
  objectTypedMap.forEach((copy, validate, objectTypedMap) => {
    if (validate(value)) {
      return (result = copy(value));
    }
  });

  return result;
};
