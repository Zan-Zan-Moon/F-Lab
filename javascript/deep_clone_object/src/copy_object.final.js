const isDate = (value) => value instanceof Date ?? false;
const isRegexp = (value) => value instanceof RegExp ?? false;
const isArray = (value) => Array.isArray(value);
const isSet = (value) => value instanceof Set ?? false;
const isMap = (value) => value instanceof Map ?? false;
const isObject = (value) => value instanceof Object ?? false;

//  TypedArray

function copyDate(value) {
  return new Date(value.getTime());
}

function copyRegexp(value) {
  return new RegExp(value);
}

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

const copyTable = [
  {
    validation: isDate,
    copy: copyDate,
  },
  {
    validation: isRegexp,
    copy: copyRegexp,
  },
  {
    validation: isArray,
    copy: copyArray,
  },
  {
    validation: isSet,
    copy: copySet,
  },
  {
    validation: isMap,
    copy: copyMap,
  },
  {
    validation: isObject,
    copy: copyObject,
  },
];

function deepCopy(value) {
  for (const { copy, validation } of copyTable) {
    if (validation(value)) {
      return copy(value);
    }
  }

  return value;
}

module.exports = deepCopy;
