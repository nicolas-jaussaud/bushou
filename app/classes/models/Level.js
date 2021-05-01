import Settings from '../Settings'
import { __ } from '../../data/text'
export default class Level {

  constructor(number, module) {

    this.module = module
    this.number = number
    
    this.characters = false
  }

  getTitle = () => (__('level') + ' ' + this.number)
  getLives = () => (parseInt( this.module.get('lives')))
  getRounds = () => (this.module.get('roundNumber') ? parseInt(this.module.get('roundNumber')) : 100)

  getCharacters() {

    if(this.characters !== false) return this.characters;

    const data = this.module.getData()
    const firstItem = this.getFirstItem() ? this.getFirstItem() : 0
    const number = firstItem ? (this.getCharacterNumber() + firstItem) : this.getCharacterNumber() 

    this.characters = Object.keys(data).slice(firstItem, number).reduce((result, key) => {
      result[key] = data[key]
      return result;
    }, {})

    return this.characters
  }

  getRandomIndex() {
    const keys = Object.keys(this.getCharacters())
    return keys[keys.length * Math.random() << 0]
  }
  
  /**
   * Number of characters of the current Level
   */
  getCharacterNumber() {
    
    const number = this.number * this.module.getNewItems()
    const max = this.module.getMax()
    const moduleCharacters = this.module.getCharacterNumber()

    if(number > moduleCharacters && max === false) return this.module.getCharacterNumber()

    return max !== false && max < number ? this.module.getMax() : number
  }

  /**
   * Get index of the first character of the level (or false if first of the list)
   */
  getFirstItem() {

    const number = this.number * this.module.getNewItems()
    const max = this.module.getMax()

    return max && max < number ? number - max : false
  }

  isLocked = async () => {

    const progress = await this.module.getProgress()

    return Settings.data.isProgress !== 'no' ? progress < parseInt(this.number) : false
  }

  completeLevel = async callback => {

    // If no progress enable no need to save anything
    if(Settings.data.isProgress === 'no') {
      callback()
      return;
    }

    const previousProgress = await this.module.getProgress(true)
    const currentLevel = parseInt(this.number)
    
    console.log('current: ' + previousProgress)
    console.log('level: ' + currentLevel)

    previousProgress < currentLevel
      ? this.module.setProgress(currentLevel, callback)
      : callback()
  }

}
