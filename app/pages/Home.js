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
      'progress-hsk1-pinyin': 0,
    }

    // Need a function for support settings
    this.styles = getStyles()
    
    this.reloadStyle = this.reloadStyle.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
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
    ['progress', 'progress-hsk1', 'progress-hsk1-pinyin', 'progress-hsk1-audio'].map((name) => {
      AsyncStorage.getItem(name).then(async (value) => {
        const progress = value ? value : 1
        this.setState({[name]: progress})
      })
    })
  }

  reloadStyle = () => {
    // Change theme when reload
    this.styles = getStyles()
    this.setState({'refresh':0})
  }

  setLanguage(value) {
    Settings.setSetting('language', value, () => {
      this.setState({
        popup: false,
        progress:0
      })
      this.reloadStyle()
    })
  }

  /**
   * Renders the page
   */
  render() {

    const {navigate} = this.props.navigation;

    let popup = null  
    if(this.state.popup !== false) {
      popup = 
        <View style={this.styles.popupBg}>
          <View style={this.styles.popup}>
            <TouchableOpacity onPress={() => this.setLanguage('en')}>
              <Text style={this.styles.popupText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setLanguage('fr')}>
              <Text style={this.styles.popupText}>Français</Text>
            </TouchableOpacity>
            <Text 
              onPress={() => this.setState({'popup': false})}
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
    }

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
          <Text style={[this.styles.subtitle]}>
            { __('radicals') }
          </Text>
          <TouchableOpacity style={[this.styles.button]} onPress={() => navigate('Radicals')}>
            <Text style={[this.styles.text]}>{ __('keys') }</Text>
            <Text style={[this.styles.progress]}>{ this.state.progress }/42</Text>
          </TouchableOpacity>
          <Text  style={[this.styles.subtitle]}>
            { __('hsk') } 1
          </Text>
          <TouchableOpacity style={[this.styles.button]} onPress={() => navigate('Hsk', {type: 'characters'})}>
            <Text style={[this.styles.text]}>{ __('characters') }</Text>
            <Text style={[this.styles.progress]}>{ this.state['progress-hsk1'] }/30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.styles.button]} onPress={() => navigate('Hsk', {type: 'pinyin'})}>
            <Text style={[this.styles.text]}>{ __('pinyin') }</Text>
            <Text style={[this.styles.progress]}>{ this.state['progress-hsk1-pinyin'] }/30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[this.styles.button]} onPress={() => navigate('Hsk', {type: 'audio'})}>
            <Text style={[this.styles.text]}>{ __('audio') }</Text>
            <Text style={[this.styles.progress]}>{ this.state['progress-hsk1-audio'] }/30</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    paddingTop: '20%',
    width: '80%',
    marginLeft: '10%',
    backgroundColor: Settings.data.colors.background,
    color: Settings.data.colors.primary,
  },
  popupCross: {
    position: 'absolute',
    right: '5%',
    top: '5%',
    paddingTop: '5%'
  },
  container: {
    position: 'relative',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Settings.data.colors.background,
    color: Settings.data.colors.primary,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '66%',
    height: '50%',
    alignItems: 'center',
    flexDirection: 'column',
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
  progress: {
    color: Settings.data.colors.primary,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    width: '100%',
    padding: 10,
    color: Settings.data.colors.primary,
    marginBottom: 5,
    marginTop: 20,
  }
}))
