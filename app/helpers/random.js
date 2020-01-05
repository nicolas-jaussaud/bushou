export const getRandomProperty = (obj) => {
  let keys = Object.keys(obj)
  return obj[keys[keys.length * Math.random() << 0]]

}

export const getRandomIndex = (obj) => {
  let keys = Object.keys(obj)
  return keys[keys.length * Math.random() << 0]
}

// See https://gist.github.com/gordonbrander/2230317
export const getUniqID = () => ('_' + Math.random().toString(36).substr(2, 9))

// See https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const getShuffledArr = (arr) => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
}
