import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Switch,
  AsyncStorage
} from 'react-native';

import Settings from '../classes/Settings'
import { convertHexToRGBA } from '../helpers/colors';

export default class SettingLine extends Component {
  
  /**
   * Constructs a new instance.
   */
  constructor(props) {
    super(props)
    this.state = { value: '' }

    this.getData()
  }

  getData = async() => {
    AsyncStorage.getItem(this.props.name).then((value) => {
      this.setState({value: value !== null ? value : this.props.default})
    })
  }

  /**
   * Renders the page
   */
  render() {
    return(
      <Switch
        trackColor={{ false: convertHexToRGBA(Settings.data.colors.primary, 0.4), true: convertHexToRGBA(Settings.data.colors.primary, 0.9) }}
        thumbColor={ Settings.data.colors.primary }
        ios_backgroundColor={ Settings.data.colors.background }
        value={ this.state.value === this.props.enableValue }
        onValueChange={ () => {
          
          let newValue = this.state.value === this.props.enableValue ? 
            this.props.disableValue : 
            this.props.enableValue

          Settings.set(this.props.name, newValue, () => {
            this.setState({value: newValue})
            this.props.handle()
          }) 
        }}
      />
    )
   }
}
