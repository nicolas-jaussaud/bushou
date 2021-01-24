import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import Settings from '../classes/Settings';
import DarkMode from '../components/DarkMode'
import Language from '../components/Language'
import Popup from '../components/Popup'
import SettingsButton from '../components/SettingsButton'
import Accordion from '../components/Accordion'

// Static data
import { __ } from '../data/text'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export default class Home extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      'popup': false,
      'progress': 0,
      'progress-hsk1': 0,
      'progress-hsk1-audio': 0,
      'progress-hsk1-pinyin': 0
    }

    // Need a function for support settings
    this.styles = getStyles()
    
    this.reloadStyle = this.reloadStyle.bind(this)
    this.getDate     = this.getData.bind(this)

  }

  componentDidMount() { 
    this.getData()
    this.props.navigation.addListener('didFocus', () => {
      this.getData()
      this.reloadStyle()
    })
  }

  getData = async () => {

    // Get current user progress 
    ['progress', 'progress-hsk1', 'progress-hsk1-pinyin', 'progress-hsk1-audio'].map((name) => {
      AsyncStorage.getItem(name).then(async (value) => {
        const progress = value ? value : 1
        this.setState({[name]: progress})
      })
    })
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

    const { navigate } = this.props.navigation;
    const popup = this.state.popup !== false ? 
      <Popup change={ () => this.reloadStyle() } close={ () => this.setState({'popup': false}) }/> : 
      false 

    return (
      <View style={this.styles.container}>
        { popup }
        <View style={this.styles.header}>
          <DarkMode handler={() => {
            this.setState({'refresh':0})
            this.reloadStyle()
          }}/>
          <Language handler={() => {
            this.setState({'popup': true})
            this.reloadStyle()
          }}/>
        </View>
        <Text style={this.styles.welcome}>
          部首
        </Text>
        <Text style={this.styles.welcome}>
          BùShŏu
        </Text>
        <View style={[this.styles.buttonContainer]}>
          
          <Accordion 
            label={__('radicals')} 
            isOpen={this.state.accordionOpen === 'radicals'} 
            handler={(part) => this.setState({accordionOpen: part})}
            part={'radicals'}
          >
            <TouchableOpacity style={[this.styles.button]} onPress={() => navigate('Radicals')}>
              <Text style={[this.styles.text]}>{ __('keys') }</Text>
              <Text style={[this.styles.progress]}>
                { Settings.data.isProgress !== 'no' ? this.state.progress + '/42' : '' }
              </Text>
            </TouchableOpacity>
          </Accordion>
          
          <Accordion 
            label={__('hsk')} 
            isOpen={this.state.accordionOpen === 'hsk'} 
            handler={(part) => this.setState({accordionOpen: part})}
            part={'hsk'}
          >
            <TouchableOpacity style={[this.styles.button]} onPress={() => navigate('Hsk', {type: 'characters'})}>
              <Text style={[this.styles.text]}>{ __('characters') }</Text>
              <Text style={[this.styles.progress]}>
                { Settings.data.isProgress !== 'no' ? this.state['progress-hsk1'] + '/30' : '' }
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[this.styles.button]} onPress={() => navigate('Hsk', {type: 'pinyin'})}>
              <Text style={[this.styles.text]}>{ __('pinyin') }</Text>
              <Text style={[this.styles.progress]}>
                { Settings.data.isProgress !== 'no' ? this.state['progress-hsk1-pinyin'] + '/30' : '' }
              </Text>
            </TouchableOpacity>
            
            { Settings.data.isAudio !== 'no' ? 
              <TouchableOpacity style={[this.styles.button]} onPress={
                () => navigate('Hsk', {type: 'audio'})}>
                <Text style={[this.styles.text]}>{ __('audio') }</Text>
                <Text style={[this.styles.progress]}>
                  { Settings.data.isProgress !== 'no' ? this.state['progress-hsk1-audio'] + '/30' : '' }
                </Text>
              </TouchableOpacity> :
              <View style={[this.styles.button, {opacity: 0.5}]}>
                <View style={[this.styles.textDisableContainer]}>
                  <Text style={[this.styles.text]}>{ __('audio') }</Text>
                  <Text style={[this.styles.text, this.styles.textDisable]}>
                    ({ __('no_sound') })
                  </Text>
                </View>
                <Text style={[this.styles.progress]}>
                  { Settings.data.isProgress !== 'no' ? this.state['progress-hsk1-audio'] + '/30' : '' }
                </Text>
              </View>
            }
          </Accordion>

          <TouchableOpacity style={this.styles.containerSettings} onPress={() => navigate('Options', {type: 'audio'})}>
            <SettingsButton/>
            <Text style={this.styles.text}>
              { __('settings') }
            </Text>
          </TouchableOpacity>
          
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
  'containerSettings': {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    height: '55%',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  header: {
    flex: 1,
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    top: 10,
    left: 0,
    height: 80,
    paddingLeft: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
  text: {
    color: Settings.data.colors.primary,
  },
  textDisableContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textDisable: {
    fontStyle: 'italic',
    marginLeft: 5
  },
  progress: {
    color: Settings.data.colors.primary,
  },
  textButton: {
    textAlign: 'center',
    color: Settings.data.colors.primary,
    marginBottom: 5,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}))
