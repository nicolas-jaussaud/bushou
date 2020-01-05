const getRandomProperty = (obj) => {
  let keys = Object.keys(obj)
  return obj[keys[keys.length * Math.random() << 0]]

}

const getRandomIndex = (obj) => {
  let keys = Object.keys(obj)
  return keys[keys.length * Math.random() << 0]

}

export { getRandomProperty, getRandomIndex }
