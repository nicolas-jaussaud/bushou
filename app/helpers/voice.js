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
  
  const sound = require('../assets/sounds/correct.mp3')
  Audio.Sound.createAsync(
    sound,
    { shouldPlay: true }
  ).then((result) => {

    /**
     * Fix issue with sound dropping after some repetition
     * 
     * @see https://github.com/expo/expo/issues/1873#issuecomment-488912452
     */
    result.sound.setOnPlaybackStatusUpdate((status) => {
      if( !status.didJustFinish ) return;
      result.sound.unloadAsync()
    })

  }).catch((error) => {
    console.log('Sound error: ' + error)
  })
}

