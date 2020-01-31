import { DEFAULT } from '../data/default-config'

import {
 AsyncStorage 
} from 'react-native'

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
      // 'theme': theme ? theme : DEFAULT.theme
      'theme': 'dark'
    }

    if(Settings.data.theme === 'dark') {
      Settings.data.colors.primary = background ? background : DEFAULT.colors.background
      Settings.data.colors.background = primary ? primary : DEFAULT.colors.primary
    }

    return Settings.data
  }

  getSetting = async(key) => (AsyncStorage.getItem(key).then((value) => (value)))

}
