import React, { Component } from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

import Settings from '../classes/Settings'

export default class DarkMode extends Component {
  
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
    if(Settings.data.theme === 'dark') {
      return Asset.loadAsync([require('../assets/img/sun.png')]);
    }
    return Asset.loadAsync([require('../assets/img/moon.png')]);
  }

  /**
   * Renders the page
   */
  render() {
    return(
      <TouchableOpacity style={styles.button} onPress={this.props.handler}>
        <Image
          style={styles.image}
          source={Settings.data.theme === 'dark' ? require('../assets/img/language-white.png') : require('../assets/img/language.png')}
        />
      </TouchableOpacity>
    )
   }

}

const styles = StyleSheet.create({
  'image': {
    width: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    height: 30,
  },
  'button': {
    flex: 1,
    justifyContent: 'center',
  }
})
