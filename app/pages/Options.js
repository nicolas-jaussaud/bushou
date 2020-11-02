import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  SafeAreaView, 
  SectionList
} from 'react-native';
import { Picker } from 'react-native';

import Settings from '../classes/Settings';
import SettingLine from '../components/SettingLine';

// Static data
import { __ } from '../data/text'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export default class Options extends Component {

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

          <View style={[this.styles.titleContainer, {paddingTop: 0}]}>
            <Text style={ this.styles.title }>
              { __('display') }
            </Text>
          </View>

          <View style={ this.styles.settingLine }>
            <Text style={ this.styles.text }>
              { __('dark_mode') }
            </Text>
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
          </View>

          <View style={ this.styles.settingLine }>
            <Text style={ this.styles.text }>
              { __('language') }
            </Text>
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
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Français" value="fr" />
            </Picker>
          </View>

           <View style={ this.styles.settingLine }>
            <Text style={ this.styles.text }>
              { __('characters') }
            </Text>
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
          </View>

          <View style={ this.styles.titleContainer }>
            <Text style={ this.styles.title }>
              { __('game') }
            </Text>
          </View>

          <View style={ this.styles.settingLine }>
            <Text style={ this.styles.text }>
              { __('progression') }
            </Text>
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
          </View>

          <View style={ this.styles.settingLine }>
            <Text style={ this.styles.text }>
              { __('vibrations') }
            </Text>
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
          </View>
            
          <View style={ this.styles.settingLine }>
            <Text style={ this.styles.text }>
              { __('sound') }
            </Text>
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
          </View>

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
  'settingLine': {
    width: '90%',
    paddingLeft: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  'text': {
    color: Settings.data.colors.primary,
  },
  'title': {
    color: Settings.data.colors.primary,
    fontWeight: 'bold'
  },
  titleContainer: {
    paddingLeft: '5%',
    paddingTop: 30,
    paddingBottom: 10,
    marginBottom: 10,
    width: '100%',
    borderBottomColor: Settings.data.colors.primary,
    borderBottomWidth: 1,
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
