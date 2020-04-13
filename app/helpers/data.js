export const getCharacters = (number, file) => {
  let data = file === 'hsk1' ?
    require('../data/hsk1.json') :
    require('../data/radicals.json');
  return Object.keys(data).slice(0, number).reduce((result, key) => {
    result[key] = data[key];
    return result;
  }, {});
}
