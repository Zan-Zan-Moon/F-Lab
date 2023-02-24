function validateTypeOfObject(value) {
  if (typeof value !== 'object' || value === null) {
    throw new Error('parameter type should be object');
  }
}

function cloneDeepObject(object) {
  validateTypeOfObject(object);
  if (Array.isArray(object)) {
    return [];
  }
  let clonObj = {};
  for (prop in object) {
    if (typeof object[prop] === 'object') {
      clonObj[prop] = cloneDeepObject(object[prop]);
    } else {
      clonObj[prop] = object[prop];
    }
  }
  return clonObj;
}

module.exports = cloneDeepObject;
