import * as Speech from 'expo-speech';

export const speak = (text) => {
  Speech.speak(text, {
    'language': 'zh' // mandarin code @see IETF BCP 47
  })
}
