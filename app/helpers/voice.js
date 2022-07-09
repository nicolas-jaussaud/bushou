import * as Speech from 'expo-speech';
import Settings from '../classes/Settings';

export const speak = (text, callback) => {

  if(Settings.data.isAudio === 'no') return;

  /**
   * Use prononciation text from string if any
   */
  if( text.includes('(') && text.includes(')') ) {
    text = text.split('(').pop().split(')')[0]
  }
  
  return Speech.speak(text, {
    language: 'zh', // mandarin code @see IETF BCP 47
    quality: 'enhanced',
    onDone: callback
  })
}
