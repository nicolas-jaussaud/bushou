import * as Speech from 'expo-speech';
import Settings from '../classes/Settings';

export const speak = (text, callback) => {

  if(Settings.data.isAudio === 'no') return;

  return Speech.speak(text, {
    'language': 'zh', // mandarin code @see IETF BCP 47
    'quality': 'enhanced',
    'onDone': callback
  })
}
