module.exports.queryString = obj =>
  Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value))
        throw new Error('please check you params');
      return `${key}=${value}`;
    })
    .join('&');
