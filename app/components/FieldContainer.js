import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class FieldContainer extends Component {

  constructor(props) {
    super(props)
    this.styles = getStyles(this.props.primary)

    this.reloadStyle = this.reloadStyle.bind(this)
  }

    /**
   * Change theme when reload
   */
  reloadStyle = () => {
    this.styles = getStyles(this.props.primary)
    this.setState({'refresh':0})
  }

  componentDidUpdate(prevProps) {
    if(prevProps.primary !== this.props.primary) this.reloadStyle()
  }

  /**
   * Renders the page
   */
  render() {
    return(
      <View style={ this.styles.settingLine }>
        <Text style={ this.styles.text }>
          { this.props.label }
        </Text>
        { this.props.children }
      </View>
    )
   }

}

const getStyles = (primary) => (StyleSheet.create({  
  settingLine: {
    width: '90%',
    paddingLeft: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: primary,
  },
}))
