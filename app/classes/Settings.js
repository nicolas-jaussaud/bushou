import { DEFAULT } from '../data/default-config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setStatusBarStyle } from 'expo-status-bar';

export default class Settings {

  static data = DEFAULT

  init = async() => {

    const language      = await Settings.get('language')
    const characters    = await Settings.get('characters')
    const primary       = await Settings.get('primary')
    const background    = await Settings.get('background')
    const theme         = await Settings.get('theme')
    const isProgress    = await Settings.get('is-progression')
    const isVibrations  = await Settings.get('is-vibrations')
    const isAudio       = await Settings.get('is-audio')
    const customLevels  = await Settings.get('custom-levels')

    Settings.data = {
      'language': language ? language : DEFAULT.language,
      'characters': characters ? characters : DEFAULT.characters,
      'colors': {
        'background': background ? background : DEFAULT.colors.background,
        'primary': primary ? primary : DEFAULT.colors.primary
      },
      'theme': theme ? theme : DEFAULT.theme,
      'isProgress': isProgress ? isProgress : DEFAULT.isProgress,
      'isVibrations': isVibrations ? isVibrations : DEFAULT.isVibrations,
      'isAudio': isAudio ? isAudio : DEFAULT.isAudio,
      'customLevels': customLevels ? customLevels.split(',') : DEFAULT.customLevels
    }

    if(Settings.data.theme === 'dark') {
      Settings.data.colors.primary = background ? background : DEFAULT.colors.background
      Settings.data.colors.background = primary ? primary : DEFAULT.colors.primary
    }

    // Color icon in the notification bar
    setStatusBarStyle(Settings.data.theme === 'dark' ? 'light' : 'dark')

    return Settings.data
  }

  static get = async(key) => (AsyncStorage.getItem(key).then((value) => (value)))
  
  static set = (key, value, callback = false) => {

    Settings.data['custom-levels' ? 'customLevels' : key] = value

    AsyncStorage.setItem(key, value).then(async() => {
    
      const SettingsObj = new Settings()
      await SettingsObj.init()

      if(callback !== false) callback()
    })
  }
  
}
