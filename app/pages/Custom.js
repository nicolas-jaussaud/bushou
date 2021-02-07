import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import FieldContainer from '../components/FieldContainer';
import SectionTitle from '../components/SectionTitle';

import Settings from '../classes/Settings';
import SettingLine from '../components/SettingLine';

import { getUniqID } from '../helpers/random';

// Static data
import { __ } from '../data/text'

export default class Custom extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      language: Settings.data.language,
      characters: Settings.data.characters,
      startNumber: 0,
      endNumber: 0,
      currentData: {}
    }

    // Need a function for support settings
    this.styles = getStyles()
    
    this.reloadStyle = this.reloadStyle.bind(this)
  }

  componentDidMount() { 
    this.props.navigation.addListener('didFocus', () => this.reloadStyle())
  }

  /**
   * Change theme when reload
   */
  reloadStyle = () => {
    this.styles = getStyles()
    this.setState({'refresh':0})
  }

  setValue() {

  }
  
  /**
   * Renders the page
   */
  render() {

    return (
      <View style={this.styles.container}>
        <Text style={this.styles.welcome}>
          部首
        </Text>
        <Text style={this.styles.welcome}>
          { __('create_custom') }
        </Text>
        <View style={[this.styles.settingsContainer]}>

          <SectionTitle noPadding={ true } text={ __('data') } primary={ Settings.data.colors.primary }/>

          <FieldContainer label={ __('data_type') } primary={ Settings.data.colors.primary }>
            <Picker
              selectedValue={ this.state.language }
              style={[this.styles.text, this.styles.select]}
              itemStyle={[this.styles.text, {width: '75%'}]}
              onValueChange={(value, i) => {
                // Settings.set('language', value, () => this.setState({language: value}))
              }}>
              <Picker.Item label="Radicals" value="radicals" />
              <Picker.Item label="HSK 1" value="hsk" />
            </Picker>
          </FieldContainer>
            
          <FieldContainer label={ __('items_by_level') } primary={ Settings.data.colors.primary }>
            <TextInput
              keyboardType='phone-pad'
              style={[this.styles.text, this.styles.number]}
              onChangeText={ text => {
                const number = parseInt(text)
                this.setState({startNumber: Number.isNaN(number) ? 0 : number}
              )}}
              value={ this.state.startNumber }
            />
          </FieldContainer>

          <SectionTitle text={ __('game') } primary={ Settings.data.colors.primary }/>

          <FieldContainer label={ __('enable_acceleration') } primary={ Settings.data.colors.primary }>
            <SettingLine
              name={ 'is-acceleration' }
              enableValue={ 'yes' }
              disableValue={ 'no' }
              default={ 'yes' }
            />
          </FieldContainer>

          { this.state['is-acceleration'] === 'yes' ?   
          <FieldContainer label={ __('time_by_characters') } primary={ Settings.data.colors.primary }>
            <Picker
              selectedValue={ this.state.language }
              style={[this.styles.text, this.styles.select]}
              itemStyle={[this.styles.text, {width: '75%'}]}
              onValueChange={(value, i) => {
                // Settings.set('language', value, () => this.setState({language: value}))
              }}>
                { [...Array(21).keys()].map((index) => {
                  if(index === 0) return;
                  return(
                    <Picker.Item 
                      key={ getUniqID() } 
                      value={ index } 
                      label={ index + ' ' + (index === 1 ? __('second') : __('seconds')) } 
                    />
                  )
                })}
            </Picker>
          </FieldContainer> : null }
            
          <Text>{ JSON.stringify(this.state.currentData) }</Text>
        </View>
      </View>
    );
  }
}

const getStyles = () => (StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Settings.data.colors.background,
    color: Settings.data.colors.primary,
  },
  settingsContainer: {
    justifyContent: 'flex-start',
    width: '80%',
    height: '55%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: Settings.data.colors.primary,
  },
  text: {
    color: Settings.data.colors.primary,
  },
  select: {
    transform: [
      {scale: 0.9}, 
      {translate: [23,0]
    }], 
    height: 30, 
    width: 130
  },
  number: {
    height: 30, 
    width: 130, 
    borderColor: Settings.data.colors.primary, 
    borderWidth: 0.5,
    textAlign: 'center'
  }
}))
