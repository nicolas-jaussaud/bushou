export const getCharacters = (number, file, firstItem = false) => {

  let data = file === 'hsk1' ?
    require('../data/hsk1.json') :
    require('../data/radicals.json')
  
  firstItem = firstItem ? firstItem : 0
  number = firstItem ? (number + firstItem) : number 

  return Object.keys(data).slice(firstItem, number).reduce((result, key) => {
    result[key] = data[key];
    return result;
  }, {});
}
