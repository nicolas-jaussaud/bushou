
import AsyncStorage from '@react-native-async-storage/async-storage'

import Settings from '../Settings'
import Level from './Level'
import { __ } from '../../data/text'
import { speak } from '../../helpers/voice';

import HskData from '../../data/hsk1'
import RadicalsData from '../../data/radicals'

import StaticRadicals from '../../data/modules/radicals'
import StaticRadicalsPinyin from '../../data/modules/radicals-pinyin'
import StaticRadicalsAudio from '../../data/modules/radicals-audio'

import StaticHsk from '../../data/modules/hsk1'
import StaticHskPinyin from '../../data/modules/hsk1-pinyin'
import StaticHskAudio from '../../data/modules/hsk1-audio'

export default class Module {
  
  constructor(key) {

    this.key = key
    this.data = []
    this.characterData = false

    /**
     * HSK and Radical base modules has parameters stored in
     * a static JSON file instead of in AsyncStorage
     */
    this.staticModules = [
      'radicals',
      'radicals-pinyin',
      'radicals-audio',
      'hsk1',
      'hsk1-pinyin',
      'hsk1-audio',
    ]

    this.isStatic = this.staticModules.includes(key) ? true : false

    // Allow the use of await for instanciation
    return (async () => {
      
      await this.init()

      return this;
  })();
  }

  init = async () => (this.isStatic ? await this.initStatic() : await this.initCustom())
  getAsync = async storageKey => (await AsyncStorage.getItem(storageKey).then((value) => (value)))

  set = (key, value) => this.data[key] = value
  get = key => (this.data[key] ? this.data[key] : false)

  /**
   * Custom init is for module created by user (data stored in AsyncStorage)
   */
  async initCustom() {

    const data = JSON.parse(await this.getAsync(this.key))
    Object.keys(data).map(key => this.set(key, data[key]))

    this.initProgress()
  }

  /**
   * Static init is for default modules, where settings can't be changed
   */
  initStatic() {

    const data = this.getJSON(this.key)
    Object.keys(data).map(key => this.set(key, data[key]))
    
    this.initProgress()
  }

  /**
   * For legacy reason progress key of radical is just 'progress"
   */
  getProgressKey = () => (this.isStatic && this.key === 'radicals' ? 'progress' : 'progress-' + this.key)

  /**
   * If progress dosen't exists it means that user didn't start yet
   */
  async initProgress() {
    
    const progress = await this.getAsync( this.getProgressKey() )

    this.set('progress', progress !== null ? progress : '0')
  }
  
  async setProgress(progress, callback) {
    AsyncStorage.setItem(this.getProgressKey(), progress.toString()).then(callback) 
  }

  getJSON() {

    switch(this.key) {
      case 'radicals': return StaticRadicals;
      case 'radicals-pinyin': return StaticRadicalsPinyin
      case 'radicals-audio': return StaticRadicalsAudio
      case 'hsk1': return StaticHsk
      case 'hsk1-pinyin': return StaticHskPinyin
      case 'hsk1-audio': return StaticHskAudio
    }
  }

  /**
   * Get data of the whole module and cache the result
   */
  getData = () => (this.get('data') === 'hsk1' ? HskData : RadicalsData)

  /**
   * Calculate the number of levels according to the module settings
   */
  getLevels() {

    const levels = [] 
    for (let i = 0; i < this.getLevelNumber(); i++) levels.push( new Level((i + 1), this) )

    return levels
  }

  /**
   * Static module has translations
   */
  getTitle = () => (this.isStatic ? __( this.get('name') ) : this.get('name'))
  
  getInitialSeconds = () => (
    this.get('timeByCharacters') && this.get('isAcceleration') !== 'yes'
      ? parseInt(this.get('timeByCharacters')) 
      : 10
  )
  
  /**
   * This really needs to be reworked
   */
  getSecondPerRound = round => {
    if(this.get('isAcceleration') === 'yes') {
      round = round > 100 ? 100 : round
      return round > 10 ? this.getInitialSeconds() / (round * 0.1) : this.getInitialSeconds()
    }
    return this.getInitialSeconds()
  }
  
  // Calculation helpers

  getMax = () => (this.get('maxItems') && this.get('isUnlimited') !== 'yes' ? parseInt( this.get('maxItems') ) : false)
  getNewItems = () => (this.get('newItems') ? parseInt( this.get('newItems') ) : false)
  getTotal = () => (Math.ceil( this.getCharacterNumber() / parseInt(this.get('newItems') )))
  getLevelNumber = () => (Math.ceil( this.getCharacterNumber() / this.getNewItems() ))
  getCharacterNumber = () => (this.get('data') === 'radicals' ? 214 : 156)
  
  getRounds = () => (this.get('roundNumber') ? parseInt(this.get('roundNumber')) : 100)
  
  async getProgress(forceReload = false) {
    
    if(forceReload) await this.initProgress()
    
    return parseInt(this.get('progress'))
  }

  getProgressText() {

    if(Settings.data.isProgress === 'no') return '';

    const progress = parseInt(this.get('progress'))
    const total = this.getTotal()

    return `${progress ? progress : 0}/${total}`
  }

  useAudio = () => (this.get('answerItems') === 'audio' || this.get('targetItem') === 'audio')

  /**
   * Appropriate sound when it's the correct answer
   */
  correctAnswer = answer => {
    this.get('answerItems') !== 'audio' && Settings.data.isAudio !== 'no' ? 
    this.speak(answer) : ''
  }

  getCardText = item => {

    switch(this.get('answerItems')) {

      case 'characters': return this.getCharacter(item.data.character)
      case 'pinyin': return item.data.pinyin
      
      case 'translation': 
        return this.get('data') === 'hsk1' 
          ? item.data.translations[ Settings.data.language ]
          : item.data.name[ Settings.data.language ]
      
      default: return item.data.character
    }
  }

  getCharacter(item) {

    if(Settings.data.characters !== 'traditional') return item;
    
    const data = this.getData()

    return 'traditional' in data[ item ] ? data[ item ].traditional : item
  }

  getItemText = item => {

    const data = this.getData()
    
    switch(this.get('targetItem')) {

      case 'audio':
        this.speak(item)
        return '?';
      case 'characters': return this.getCharacter(item)
      case 'pinyin': return data[ item ].pinyin
      
      case 'translation': 
        return this.get('data') === 'hsk1' 
          ? data[ item ].translations[ Settings.data.language ]
          : data[ item ].name[ Settings.data.language ]
      
      default: return this.getCharacter(item)
    }
  }

  /**
   * There is some radicals which has a different name than the pronunciation, the speak
   * function will not prononce it has we want if we use the character so we we use pinyin
   * 
   * However we can't use this everywhere because speak dosen't support tones with pinyin (unfortunalty)
   */
  speak(item) {

    if(this.get('data') === 'hsk1' ) {
      speak(item)
      return;
    }

    // @see https://ltl-beijing.com/chinese-radicals/
    const exceptions = [
      '丨',
      '丶',
      '亅'
    ]

    exceptions.includes(item)
      ? speak( this.getData()[ item ].pinyin )
      : speak(item)
  }
}
