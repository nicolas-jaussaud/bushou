import React, { Component } from 'react';
import { 
  StyleSheet,
  Image,
  View
} from 'react-native';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

export default class Heart extends Component {
  
  /**
   * Constructs a new instance.
   */
  constructor(props) {
    super(props)
    this.state = { isReady: false };
  }

  /**
   * @see https://stackoverflow.com/a/51821784/10491705
   */
  async _cacheResourcesAsync() {
    return Asset.loadAsync([require('../assets/img/heart.png')]);
  }

  /**
   * Renders the page
   */
  render() {
    if(!this.state.isReady) {
      return(
        <AppLoading
          startAsync={() => this._cacheResourcesAsync()}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return(
      <View>
        <Image
          style={styles.image}
          source={require('../assets/img/heart.png')}
        />
      </View>
    )
   }

}

const styles = StyleSheet.create({
  'image': {
    width: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    height: 30
  }
})
