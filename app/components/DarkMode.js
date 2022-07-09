import React, { Component } from 'react';
import { 
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import AppLoading from 'expo-app-loading'
import { Asset } from 'expo-asset'

import Settings from '../classes/Settings'

export default class DarkMode extends Component {
  
  /**
   * Constructs a new instance.
   */
  constructor(props) {
    super(props)
    this.state = { isReady: false }

    this.changeTheme = this.changeTheme.bind(this)
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

  changeTheme() {
    Settings.set('theme', Settings.data.theme === 'dark' ? 'light' : 'dark', this.props.handler) 
  }

  /**
   * Renders the page
   */
  render() {

    if(!this.state.isReady) {
      return(
        <AppLoading
          startAsync={() => this._cacheResourcesAsync()}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      )
    }

    return(
      <TouchableOpacity onPress={this.changeTheme}>
        <Image
          style={styles.image}
          source={Settings.data.theme === 'dark' ? require('../assets/img/sun.png') : require('../assets/img/moon.png')}
        />
      </TouchableOpacity>
    )
   }

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
