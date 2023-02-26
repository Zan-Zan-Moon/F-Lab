function validateTypeOfObject(value) {
  if (typeof value !== 'object' || value === null) {
    throw new Error('parameter type should be object');
  }
}

function cloneDeepArray(array) {
  const deepCopiedArr = array.map((value) => {
    if (Array.isArray(value)) {
      return cloneDeepArray(value);
    }

    if (Object.prototype.toString.call(value) === '[object Object]') {
      return cloneDeepObject(value);
    }

    return value;
  });
  return deepCopiedArr;
}

function cloneDeepObject(obj) {
  let deepCopiedObj = {};

  for (prop in obj) {
    if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
      deepCopiedObj[prop] = cloneDeepObject(obj[prop]);
    } else if (Array.isArray(obj[prop])) {
      deepCopiedObj[prop] = cloneDeepArray(obj[prop]);
    } else {
      deepCopiedObj[prop] = obj[prop];
    }
  }
  return deepCopiedObj;
}

function cloneObject(objectTypedValue) {
  validateTypeOfObject(objectTypedValue);

  const result = objectTypedValue;

  if (Array.isArray(objectTypedValue)) {
    return cloneDeepArray(objectTypedValue);
  }

  if (Object.prototype.toString.call(objectTypedValue) === '[object Object]') {
    return cloneDeepObject(objectTypedValue);
  }

  return result;
}

module.exports = { cloneObject, cloneDeepArray, cloneDeepObject };
