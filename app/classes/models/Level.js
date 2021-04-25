// import { DEFAULT } from '../data/default-config'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { setStatusBarStyle } from 'expo-status-bar';
import Module from './Module'

export default class Level {

  static data = DEFAULT

  constructor(key, level) {
    this.level  = parseInt(level)
    this.module = new Module(key)
  }

}
