function validateTypeOfObject(value) {
  if (typeof value !== 'object' || value === null) {
    throw new Error('parameter type should be object');
  }
}

function cloneDeepObject(object) {
  validateTypeOfObject(object);
  const clonObj = { ...object };
  return clonObj;
}

module.exports = cloneDeepObject;
