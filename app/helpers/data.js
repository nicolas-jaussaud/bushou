export const getCharacters = (number) => {
  let data = require('../data/data.json')
  return Object.keys(data).slice(0, number).reduce((result, key) => {
    result[key] = data[key];
    return result;
  }, {});
}
