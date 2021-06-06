import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import FieldContainer from '../components/FieldContainer';
import SectionTitle from '../components/SectionTitle';

import Settings from '../classes/Settings';
import SettingLine from '../components/SettingLine';

// Static data
import { 
  __, 
  languages 
} from '../data/text'

export default class Options extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    headerShown: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      language: Settings.data.language,
      characters: Settings.data.characters
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
          { __('settings') }
        </Text>
        <View style={[this.styles.settingsContainer]}>

          <SectionTitle noPadding={ true } text={ __('display') } primary={ Settings.data.colors.primary }/>

          <FieldContainer label={ __('dark_mode') } primary={ Settings.data.colors.primary }>
            <SettingLine
              name={ 'theme' }
              enableValue={ 'dark' }
              disableValue={ 'light' }
              default={ Settings.data.theme }
              handle={ () => {
                this.reloadStyle()
                this.setState({'refresh':0})
              }}  
            />
          </FieldContainer>
          
          <FieldContainer label={ __('language') } primary={ Settings.data.colors.primary }>
            <Picker
              selectedValue={ this.state.language }
              style={[this.styles.text, this.styles.select]}
              itemStyle={[this.styles.text, {width: '75%'}]}
              onValueChange={(value, i) => { 
                Settings.set('language', value, () => {
                  this.setState({'language': value})
                  this.reloadStyle()
              })}
            }>
              { languages.map((language) => (
                <Picker.Item label={ language.label } value={ language.code } />
              )) }
            </Picker>
          </FieldContainer>
          
          <FieldContainer label={ __('characters') } primary={ Settings.data.colors.primary }>
            <Picker
              selectedValue={ this.state.characters }
              style={[this.styles.text, this.styles.select]}
              itemStyle={[this.styles.text, {width: '75%'}]}
              onValueChange={ (value, i) =>  
                Settings.set('characters', value, () => this.setState({'characters': value}))
              }
            >
              <Picker.Item label={ __('simplified') } value="simplified" />
              <Picker.Item label={ __('traditional') } value="traditional" />
            </Picker>
          </FieldContainer>
          
          <SectionTitle text={ __('game') } primary={ Settings.data.colors.primary }/>

          <FieldContainer label={ __('progression') } primary={ Settings.data.colors.primary }>
             <SettingLine
              name={ 'is-progression' }
              enableValue={ 'yes' }
              disableValue={ 'no' }
              default={ Settings.data.isProgress }
              handle={ () => {
                this.reloadStyle()
                this.setState({'refresh':0})
              }}
            />
          </FieldContainer>
          
          <FieldContainer label={ __('vibrations') } primary={ Settings.data.colors.primary }>
             <SettingLine
              name={ 'is-vibrations' }
              enableValue={ 'yes' }
              disableValue={ 'no' }
              default={ Settings.data.isVibrations }
              handle={ () => {
                this.reloadStyle()
                this.setState({'refresh':0})
              }}
            />
          </FieldContainer>

          <FieldContainer label={ __('sound') } primary={ Settings.data.colors.primary }>
             <SettingLine
              name={ 'is-audio' }
              enableValue={ 'yes' }
              disableValue={ 'no' }
              default={ Settings.data.isAudio }
              handle={ () => {
                this.reloadStyle()
                this.setState({'refresh':0})
              }}
            />            
          </FieldContainer>
          
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
  } 
}))
