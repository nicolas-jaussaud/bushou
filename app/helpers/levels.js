import AsyncStorage from '@react-native-async-storage/async-storage'
import Settings from '../classes/Settings';

/**
 * Get levels created by the user
 */
export const getCustomLevels = async () => {
  
  const levelKeys = Settings.data.customLevels
  const levels = {}

  for (let i = 0; i < levelKeys.length; i++) {
    levels[ levelKeys[i] ] = JSON.parse(await AsyncStorage.getItem(levelKeys[i]).then((value) => (value)))
    const progress = await AsyncStorage.getItem('progress-' + levelKeys[i]).then((value) => (value))
    levels[ levelKeys[i] ].progress = progress ? progress : 1
  }

  return levels
}
