import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text,
  TouchableOpacity
} from 'react-native';

import Settings from '../classes/Settings';

export default class Card extends Component {
	
  constructor(props) {
    super(props)
    this.styles = getStyles()

  }

	/**
 	 * Renders the page
 	 */
	render() {
		return(
      <TouchableOpacity style={this.styles.container} onPress={() => this.props.handle(this.props.isCorrect)}>
        <Text style={this.styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
	 }

}

const getStyles = () => (StyleSheet.create({
  'container': {
    width: '48%',
    height: '48%',
    alignSelf: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Settings.data.colors.primary,
    color: Settings.data.colors.primary,
    margin: '1%'
  },
  'text': {
    color: Settings.data.colors.primary,
    textTransform: 'capitalize',
    textAlign: 'center'
  }
}))
