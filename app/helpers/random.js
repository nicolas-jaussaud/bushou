export const getRandomProperty = (obj, excludes = []) => {
  
  const keys = Object.keys(obj)

  // Avoid duplicate propositions
  for( let i = 0; i < excludes.length; i++ ) {
    
    if( ! excludes[i] ) continue
    if( ! excludes[i].data ) continue
    if( ! excludes[i].data.character ) continue

    keys.splice(keys.indexOf(excludes[i].data.character), 1)        
  } 

  // Can happen if only one item in the level
  if( keys.length === 0 ) return false;

  const excludedPinyins = excludes.map(item => {

    if( ! item ) return ''
    if( ! item.data ) return ''
    if( ! item.data.pinyin ) return ''

    return item.data.pinyin
  })

  let isValidIndex, index = false

  // To avoid confusion, we don't use pinyin that are too similar
  while( ! isValidIndex ) {

    isValidIndex = true
    index = keys.length * Math.random() << 0

    const currentPinyin = obj[keys[index]].pinyin

    excludedPinyins.map(pinyin => {

      if( pinyin.length !== currentPinyin.length ) return
      if( Array.from(pinyin)[0] !== Array.from(currentPinyin)[0] ) return

      isValidIndex = false
    })

  }
  
  const response = obj[keys[index]]

  // Add the caracter (the key in the object) in the response
  response.character = keys[index]

  return response
}

/**
 * @see https://gist.github.com/gordonbrander/2230317
 */
export const getUniqID = () => ('_' + Math.random().toString(36).substr(2, 9))

/**
 * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
export const getShuffledArr = (arr) => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
}
