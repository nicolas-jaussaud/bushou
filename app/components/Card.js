import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text,
  TouchableOpacity
} from 'react-native';

import { CONFIG } from '../data/config'

export default class Card extends Component {
	
	/**
 	 * Renders the page
 	 */
	render() {
		return(
      <TouchableOpacity style={styles.container} onPress={() => this.props.handle(this.props.isCorrect)}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
	 }

}

const styles = StyleSheet.create({
  'container': {
    width: '48%',
    height: '48%',
    alignSelf: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CONFIG.colors.primary,
    color: CONFIG.colors.primary,
    margin: '1%'
  },
  'text': {
    textTransform: 'capitalize'    
  }
})
