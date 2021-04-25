import Settings from '../Settings'
import { __ } from '../../data/text'

export default class Level {

  constructor(number, module) {

    this.module = module
    this.number = number
  }

  getTitle = () => (__('level') + ' ' + this.number)
  getLives = () => (parseInt( this.module.get('lives')))
  getRounds = () => (this.module.get('roundNumber') ? parseInt(this.module.get('roundNumber')) : 100)

  /**
   * Number of characters of the current Level
   */
  getCharacterNumber() {
    
    const number = this.number * this.module.getNewItems()
    const max = this.module.getMax()
    const moduleCharacters = this.module.getCharacterNumber()

    if(number > moduleCharacters && max === false) return this.module.getCharacterNumber()

    return max !== false && max < number ? module.getMax() : number
  }

  /**
   * Get index of the first character of the level (or false if first of the list)
   */
  getFirstItem() {

    const number = this.number * this.module.getNewItems()
    const max = this.module.getMax()

    return max && max < number ? number - max : false
  }

  isLocked = () => (Settings.data.isProgress !== 'no' ? this.module.getProgress() < this.number : false)
}
