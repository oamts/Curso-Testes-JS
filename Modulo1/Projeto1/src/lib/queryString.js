const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value))
    throw new Error('please check you params');
  return `${key}=${value}`;
};

module.exports.queryString = obj =>
  Object.entries(obj).map(keyValueToString).join('&');

module.exports.parse = string =>
  Object.fromEntries(
    string.split('&').map(item => {
      let [key, value] = item.split('=');

      if (value.includes(',')) {
        value = value.split(',');
      }
      return [key, value];
    }),
  );
