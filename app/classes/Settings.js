import { DEFAULT } from '../data/default-config'

import { AsyncStorage } from 'react-native'
import { setStatusBarStyle } from 'expo-status-bar';

export default class Settings {

  static data = DEFAULT

  init = async() => {

    const language = await this.getSetting('language')
    const primary = await this.getSetting('primary')
    const background = await this.getSetting('background')
    const theme = await this.getSetting('theme')

    Settings.data = {
      'language': language ? language : DEFAULT.language,
      'colors': {
        'background': background ? background : DEFAULT.colors.background,
        'primary': primary ? primary : DEFAULT.colors.primary
      },
      'theme': theme ? theme : DEFAULT.theme
    }

    if(Settings.data.theme === 'dark') {
      Settings.data.colors.primary = background ? background : DEFAULT.colors.background
      Settings.data.colors.background = primary ? primary : DEFAULT.colors.primary
    }

    // Color icon in the notification bar
    setStatusBarStyle(Settings.data.theme === 'dark' ? 'light' : 'dark')

    return Settings.data
  }

  getSetting = async(key) => (AsyncStorage.getItem(key).then((value) => (value)))
  
  static setSetting = (key, value, callback = false) => {
    
    Settings.data[key] = value
    
    AsyncStorage.setItem(key, value).then(async() => {
    
      const SettingsObj = new Settings()
      await SettingsObj.init()

      if(callback !== false) callback()
    })
  }

}
