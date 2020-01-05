import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

export default class Card extends Component {
	
	/**
 	 * Renders the page
 	 */
	render() {
		return(
      <View style={styles.text}>
        <Text>{this.props.text}</Text>
      </View>
    )
	 }

}

const styles = StyleSheet.create({
  'text': {
    width: '50%',
    height: '50%',
    backgroundColor: 'red',
    alignSelf: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  }
})
