import React, { Component } from 'react';
import { 
  StyleSheet,
  Image
} from 'react-native';

import { Asset } from 'expo-asset';

import Settings from '../classes/Settings'

export default class SettingsButton extends Component {
  
  /**
   * Constructs a new instance.
   */
  constructor(props) {
    super(props)
    this.state = { isReady: false }
  }

  /**
   * @see https://stackoverflow.com/a/51821784/10491705
   */
  async _cacheResourcesAsync() {
    // Can't use variable into require
    return Settings.data.theme === 'dark' ?
      Asset.loadAsync([require('../assets/img/sun.png')]) :
      Asset.loadAsync([require('../assets/img/moon.png')]);
  }

  /**
   * Renders the page
   */
  render() {
    return(
      <Image
        style={styles.image}
        source={Settings.data.theme === 'dark' ? require('../assets/img/settings-white.png') : require('../assets/img/settings.png')}
      />
    )
   }

}

const styles = StyleSheet.create({
  'image': {
    width: 20,
    marginRight: 5,
    marginTop: 2,
    height: 20,
  },
})
