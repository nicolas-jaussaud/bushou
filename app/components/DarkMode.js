import React, { 
  useState,
  useEffect,
  useCallback
} from 'react'

import { 
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native'

import * as SplashScreen from 'expo-splash-screen'
import { Asset } from 'expo-asset'

import Settings from '../classes/Settings'

/**
 * We need to wait for assets to be loaded before attempting to use them
 * @see https://docs.expo.dev/versions/latest/sdk/splash-screen/
 */
SplashScreen.preventAutoHideAsync()

const DarkMode = props => {

  const [ready, isReady] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        return Asset.loadAsync([ 
          Settings.data.theme === 'dark'
            ? require('../assets/img/sun.png')
            : require('../assets/img/moon.png')
        ])
      } catch (e) {
        console.warn(e)
      } finally {
        isReady(true)
      }
    })()
  }, [])

  /**
   * Avoid getting stuck on initial splash-screen
   * @see https://docs.expo.dev/versions/latest/sdk/splash-screen/#usage
   */
  const onLayoutRootView = useCallback(async () => {
    if( ready ) await SplashScreen.hideAsync()
  }, [ready])

  const changeTheme = () => {
    Settings.set(
      'theme', 
      Settings.data.theme === 'dark' ? 'light' : 'dark', 
      props.handler
    ) 
  }

  if( ready === false ) return null;

  return(
    <TouchableOpacity onPress={ changeTheme } onLayout={ onLayoutRootView }>
      <Image
        style={ styles.image }
        source={ 
          Settings.data.theme === 'dark' 
            ? require('../assets/img/sun.png') 
            : require('../assets/img/moon.png')
        }
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginTop: StatusBar.currentHeight ?? 0,
    height: 30,
  }
})

export default DarkMode
