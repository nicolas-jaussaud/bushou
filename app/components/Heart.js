import React, { Component } from 'react';
import { 
  StyleSheet,
  Image,
  View,
} from 'react-native';

export default class Heart extends Component {
  
  /**
   * Renders the page
   */
  render() {
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
