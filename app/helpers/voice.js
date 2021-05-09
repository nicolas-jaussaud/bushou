import * as Speech from 'expo-speech';
import Settings from '../classes/Settings';

export const speak = (text) => {

  if(Settings.data.isAudio === 'no') return;

  Speech.speak(text, {
    'language': 'zh', // mandarin code @see IETF BCP 47
    'quality': 'enhanced'
  })
}
