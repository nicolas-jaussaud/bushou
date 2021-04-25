
import AsyncStorage from '@react-native-async-storage/async-storage'

import Settings from '../Settings'
import { __ } from '../../data/text'

export default class Module {
  
  constructor(key) {
    
    this.key = key
    this.data = []

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

    this.init()
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
  async initStatic() {

    const data = await this.getJSON(this.key)
    Object.keys(data).map(key => this.set(key, data[key]))
    
    this.initProgress()
  }

  /**
   * If progress dosen't exists it means that user didn't start yet
   */
  async initProgress() {

    // For legacy reason progress key of radical is just 'progress"
    const progress = this.isStatic && this.key === 'radicals'
      ? await this.getAsync('progress')
      : await this.getAsync('progress-' + this.key)

    this.set('progress', progress !== null ? progress : '0')
  }

  /**
   * Currently it's not possible to use variable inside require(), so we have
   * to do use a swicth (that's annoying but there is just 4 cases to handle)
   */
  async getJSON() {

    switch(this.key) {
      case 'radicals':
        return require('../../data/modules/radicals.json')
      case 'hsk1':
        return require('../../data/modules/hsk1.json')
      case 'hsk1-pinyin':
        return require('../../data/modules/hsk1-pinyin.json')
      case 'hsk1-audio':
        return require('../../data/modules/hsk1-audio.json')
    }
  }

  /**
   * Static module has translations
   */
  getTitle = () => (this.isStatic ? __( this.get('name') ) : this.get('name'))

  getTotal = () => (
    this.get('data') === 'radicals' 
      ? Math.ceil(214 / parseInt(this.get('newItems')))  
      : Math.ceil(156 / parseInt(this.get('newItems')))
  )

  getProgressText() {

    if(Settings.data.isProgress === 'no') return '';

    const progress = this.get('progress')
    const total = this.getTotal()
    
    return `${progress}/${total}`
  }

  useAudio = () => (this.get('answerItems') === 'audio' || this.get('targetItem') === 'audio')

}
