const convertToBoolean = value => {
  const falsyValues = ["false", "null", "undefined", "0", "", "no", "n", "off"];
  return !falsyValues.includes(value.toLowerCase().trim());
};

module.exports = class BooleanConverter {
  convertMultiple(values) {
    return Object.keys(values).reduce((acc, key) => {
      acc[key] = convertToBoolean(values[key]);
      return acc;
    }, {});
  }
};
