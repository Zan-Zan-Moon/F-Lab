function validateTypeOfObject(value) {
  if (typeof value !== 'object' || value === null) {
    throw new Error('parameter type should be object');
  }
}

function cloneDeepArray(array) {
  const result = array.map((value) => value);
  return result;
}

function cloneDeepObject(objectTypedValue) {
  validateTypeOfObject(objectTypedValue);

  if (Array.isArray(objectTypedValue)) {
    const result = cloneDeepArray(objectTypedValue);
    return result;
  }

  let cloneObj = {};

  for (prop in objectTypedValue) {
    if (typeof objectTypedValue[prop] === 'object') {
      if (Array.isArray(objectTypedValue)) {
        cloneObj[prop] = cloneDeepArray(objectTypedValue[prop]);
      } else {
        cloneObj[prop] = cloneDeepObject(objectTypedValue[prop]);
      }
    } else {
      cloneObj[prop] = objectTypedValue[prop];
    }
  }
  return cloneObj;
}

module.exports = cloneDeepObject;
