import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

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
    this.state = {}

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
          Settings
        </Text>
        <View style={[this.styles.settingsContainer]}>

          <View style={ this.styles.settingLine }>
            <Text style={ this.styles.text }>
              { 'Dark Mode' }
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
              { 'Progression' }
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
              { 'Vibrations' }
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
    width: '66%',
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
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  'text': {
    color: Settings.data.colors.primary,
  },
}))
