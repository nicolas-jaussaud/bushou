import React, {
  useState,
  useEffect,
  useCallback 
} from 'react'

import { 
  StyleSheet,
  Image,
  View
} from 'react-native'

import * as SplashScreen from 'expo-splash-screen'
import { Asset } from 'expo-asset'

import Settings from '../classes/Settings'

/**
 * We need to wait for assets to be loaded before attempting to use them
 * @see https://docs.expo.dev/versions/latest/sdk/splash-screen/
 */
SplashScreen.preventAutoHideAsync()

const Heart = () => {

  const [ready, isReady] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        return Settings.data.theme === 'dark'
          ? Asset.loadAsync( [require('../assets/img/heart-white.png') ])
          : Asset.loadAsync([ require('../assets/img/heart.png') ])
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

  if( ready === false ) return null;

  return(
    <View onLayout={ onLayoutRootView }>
      <Image
        style={ styles.image }
        source={
          Settings.data.theme === 'dark' 
            ? require('../assets/img/heart-white.png') 
            : require('../assets/img/heart.png')
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    height: 30
  }
})

export default Heart
