
import AsyncStorage from '@react-native-async-storage/async-storage'

import Settings from '../Settings'
import Level from './Level'
import { __ } from '../../data/text'
import { speak, sound } from '../../helpers/voice';

import HskData from '../../data/hsk1'
import RadicalsData from '../../data/radicals'

import StaticRadicals from '../../data/modules/radicals'
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

  /**
   * Currently it's not possible to use variable inside require(), so we have
   * to do use a swicth (that's annoying but there is just 4 cases to handle)
   */
  getJSON() {

    switch(this.key) {
      case 'radicals': return StaticRadicals;
      case 'hsk1': return StaticHsk
      case 'hsk1-pinyin': return StaticHskPinyin
      case 'hsk1-audio': return StaticHskAudio
    }
  }

  /**
   * Get data of the whole module and cache the result
   */
  getData = () => (this.get('data') === 'hsk' ? HskData : RadicalsData)

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
  
  getInitialSeconds = () => (this.get('timeBycharacters') ? parseInt(this.get('timeBycharacters')) : 10)
  
  // Calculation helpers

  getMax = () => (this.get('maxItems') ? parseInt( this.get('maxItems') ) : false)
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

    const progress = this.get('progress')
    const total = this.getTotal()
    
    return `${progress}/${total}`
  }

  useAudio = () => (this.get('answerItems') === 'audio' || this.get('targetItem') === 'audio')

  /**
   * Appropriate sound when it's the correct answer
   */
  correctAnswer = answer => {
    
    if(this.get('data') === 'hsk') {
      this.get('answerItems') !== 'audio' ? speak(answer) : ''
    }
    else {
      this.get('answerItems') !== 'audio' ? sound('correct') : ''
    }
  }

  getCardText = item => {

    switch(this.get('answerItems')) {

      case 'characters': return item.data.characters
      case 'pinyin': return item.data.pinyin
      
      case 'translation': 
        return this.get('data') === 'hsk' 
          ? item.data.translations[ Settings.data.language ]
          : item.data.name[ Settings.data.language ]
      
      default: return item.data.characters        
    }
  }

  getItemText = item => {

    const data = this.getData()

    switch(this.get('targetItem')) {

      case 'audio': 
        speak(item)
        return '?';
      case 'characters': return item.answer
      case 'pinyin': return data[ item ].pinyin
      
      case 'translation': 
        return this.get('data') === 'hsk' 
          ? data[ item ].translations[ Settings.data.language ]
          : data[ item ].name[ Settings.data.language ]
      
      default: return item.answer
    }
  }

}
