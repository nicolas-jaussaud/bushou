import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text,
  TouchableOpacity
} from 'react-native';

import Settings from '../classes/Settings';
import { getUniqID } from '../helpers/random'
import { 
  __, 
  languages 
} from '../data/text'

export default class Popup extends Component {
  
  constructor(props) {
    super(props)
    this.styles = getStyles()

    this.setLanguage = this.setLanguage.bind(this)
  }

  setLanguage(value) {
    Settings.set('language', value, () => {
      this.setState({
        popup: false,
        refresh:0
      })
      this.props.change()
      this.styles = getStyles()
    })
  }

  render() {
    return(
      <View style={this.styles.popupBg}>
        <View style={this.styles.popup}>

          { languages.map((language) =>(
            <TouchableOpacity key={ getUniqID() } onPress={() => this.setLanguage(language.code)}>
              <Text style={this.styles.popupText}>
                { language.label }
              </Text>
            </TouchableOpacity>
          )) }
          
          <Text 
            onPress={ this.props.close }
            style={[
              this.styles.button, 
              { 
                marginTop: 20, 
                borderColor: Settings.data.colors.primary, 
                color: Settings.data.colors.primary}
            ]}>
           { __('close') }
          </Text>
        </View>
      </View>
    )
   }

}

const getStyles = () => (StyleSheet.create({
  popupBg: {
    zIndex: 9999,
    width: '100%',
    height: '100%',
    opacity: 0.9,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Settings.data.colors.primary,
    color: Settings.data.colors.background,
  },
  popupText: {
    color: Settings.data.colors.primary,
    paddingTop: 10,
    paddingBottom: 10,
  },
  popup: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    opacity: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%',
    paddingBottom: '5%',
    width: '80%',
    marginLeft: '10%',
    backgroundColor: Settings.data.colors.background,
    color: Settings.data.colors.primary,
  },
  button: {
    textAlign: 'center',
    color: Settings.data.colors.primary,
    marginBottom: 5,
    padding: 10,
    borderColor: Settings.data.colors.primary,
    color: Settings.data.colors.primary,
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
}))
