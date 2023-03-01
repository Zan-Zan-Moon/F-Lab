const isDate = (value) => value instanceof Date ?? false;
const isArray = (value) => Array.isArray(value);
const isObject = (value) => value instanceof Object ?? false;

// Set, Map, Symbol, Object, Regex, TypedArray

function copyDate(value) {
  return new Date(value.getTime());
}

function copyArray(values) {
  return values.reduce((arr, item, i) => {
    arr[i] = deepCopy(item);
    return arr;
  }, []);
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
    validation: isArray,
    copy: copyArray,
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
