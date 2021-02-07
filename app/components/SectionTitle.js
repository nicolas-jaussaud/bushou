import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class SectionTitle extends Component {

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
      <View style={[this.styles.titleContainer, this.props.noPadding ? {paddingTop: 0} : {}]}>
        <Text style={ this.styles.title }>
          { this.props.text }
        </Text>
      </View>
    )
   }

}

const getStyles = (primary) => (StyleSheet.create({  
  titleContainer: {
    paddingLeft: '5%',
    paddingTop: 30,
    paddingBottom: 10,
    marginBottom: 10,
    width: '100%',
    borderBottomColor: primary,
    borderBottomWidth: 1,
  },
  title: {
    color: primary,
    fontWeight: 'bold'
  },
}))
