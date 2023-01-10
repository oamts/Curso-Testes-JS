module.exports.queryString = (obj) =>
    Object.entries(obj)
        .map(([property, name]) => {
            return `${property}=${name}`
        })
        .join('&');