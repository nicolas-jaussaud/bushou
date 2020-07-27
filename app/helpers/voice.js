import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import Settings from '../classes/Settings';

export const speak = (text) => {

  if(Settings.data.isAudio === 'no') return;

  Speech.speak(text, {
    'language': 'zh', // mandarin code @see IETF BCP 47
    'quality': 'enhanced'
  })
}

/**
 * @see https://docs.expo.io/versions/latest/sdk/audio/
 */
export const sound = async (name) => {
  
  if(Settings.data.isAudio === 'no') return;
  
  const soundObject = new Audio.Sound()
  try {
      await soundObject.loadAsync(require('../assets/sounds/correct.mp3'))
      await soundObject.playAsync();
  } catch (error) {
      console.log("Sound error: Can't fetch")
  }
}
