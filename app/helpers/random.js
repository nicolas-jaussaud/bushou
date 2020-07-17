export const getRandomProperty = (obj, answer = false) => {
  
  let keys = Object.keys(obj)

  // If we need to make an excepetion for one answer
  if(answer !== false) keys.splice(keys.indexOf(answer), 1)
  
  let index = keys.length * Math.random() << 0
  let response = obj[keys[index]]

  // Add the caracter (the key in the object) in the response
  response.character = keys[index]

  return response
}

export const getRandomIndex = (obj) => {
  let keys = Object.keys(obj)
  return keys[keys.length * Math.random() << 0]
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
