import * as Speech from 'expo-speech';
import * as IntentLauncher from 'expo-intent-launcher';
import Settings from '../classes/Settings';
import { Alert } from 'react-native';
import { __ } from '../data/text';

let preferedVoice = false

/**
 * Attempt to get a local text-to-speech voice:
 * - prefere local over network
 * - prefere zh-TW is using traditional characters
 */
const setVoice = async () => {

  /**
   * @see https://docs.expo.dev/versions/latest/sdk/speech/#speechgetavailablevoicesasync
   */
  let voices = [];
  try { voices = await Speech.getAvailableVoicesAsync(); }
  catch(e) { console.error(e) }

  const codes = Settings.data.characters === 'traditional'
    ? ['zh-TW', 'zh-CN', 'zh-SG', 'zh' ]
    : ['zh-CN', 'zh-SG', 'zh-TW', 'zh' ];

  const matching = codes.flatMap(code => voices.filter(
    voice => voice.language === code
  ))

  // Local first, network last
  const available = [
    ...matching.filter(voice => /local/i.test(voice.identifier)),
    ...matching.filter(voice => !/local|network/i.test(voice.identifier)),
    ...matching.filter(voice => /network/i.test(voice.identifier)),
  ]

  if ( available.length > 0 ) {
    return preferedVoice = available[0]
  }

  Alert.alert(
    __('voice_not_installed'),
    __('voice_not_installed_message'),
    [
      {
        text    : __('ignore'),
        style   : 'cancel',
        onPress : () => preferedVoice = 'ignore',
      },
      {
        text    : __('open_settings'),
        onPress : () => {
          IntentLauncher.startActivityAsync('com.android.settings.TTS_SETTINGS');
        },
      },
    ]
  );
}

export const speak = async (text, callback) => {

  if( Settings.data.isAudio === 'no' ) return callback();
  if( preferedVoice === 'ignore' ) return callback();

  if( preferedVoice === false ) {
    await setVoice()
  }

  /**
   * Use prononciation text from string if any
   */
  if( text.includes('(') && text.includes(')') ) {
    text = text.split('(').pop().split(')')[0]
  }

  return Speech.speak(text, {
    language  : preferedVoice.language,
    voice     : preferedVoice.identifier,
    quality   : preferedVoice.quality,
    onDone    : callback,
    onError(e) {
      console.log( JSON.stringify(e) )
      callback()
    }
  })
}
