import React, { Component } from 'react';
import { 
  StyleSheet,
  View
} from 'react-native';

export default class StoppedBar extends Component {
    
  constructor(props) {
    super(props)
    this.styles = getStyles(this.props.color)
  }

  /**
   * Renders the page
   */
  render() {
    return(
      <View style={this.styles.container}>
        <View style={{
          flex: 100,
          height: '100%',
          backgroundColor: this.props.color
        }}>
        </View>
      </View>
    )
   }

}

const getStyles = color => (StyleSheet.create({
  'container': {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '80%',
    flex: 0.1,
    height: '5%',
    backgroundColor: color,
    marginTop: 10,
    marginBottom: 10
  },
}))
