import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import Settings from '../classes/Settings';
import DarkMode from '../components/DarkMode'
import Language from '../components/Language'
import Popup from '../components/Popup'

// Static data
import { LEVELS } from '../data/levels-hsk1'
import { __ } from '../data/text'

// Dependencies
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export default class Hsk extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      'progress': 0,
      'popup': false
    }

    // For getting progress
    this.storageKey = 'progress-hsk1-' + this.props.navigation.state.params.type

    // For legacy 
    if(this.storageKey === 'progress-hsk1-characters') this.storageKey = 'progress-hsk1'
    
    this.title = __('hsk') + ' ' + 1 + ' - ' + __(this.props.navigation.state.params.type)

    // Need a function for support settings
    this.styles = getStyles()
    
    this.getProgress = this.getProgress.bind(this)
    this.reloadStyle = this.reloadStyle.bind(this)
  }

  componentDidMount() { 
    this.props.navigation.addListener('didFocus', () => {
      this.reloadStyle()
    })
  }

  reloadStyle = () => {
    // Change theme when reload
    this.setState({progress: 0}, 
      () => this.getProgress())
    this.styles = getStyles()
  }

  getProgress = async () => {
    AsyncStorage.getItem(this.storageKey).then(async (value) => {
      const progress = value ? value : 1
      this.setState({progress: progress})
    })    
  }

  /**
   * Renders the page
   */
  render() {

    // Show the progress only when we load the progress number
    const levels = this.state.progress !== 0 ?
      <Carousel
        layout='default'
        ref={(c) => { this._carousel = c; }}
        data={ LEVELS }
        renderItem={ this._renderItem }
        sliderWidth={ viewportWidth }
        itemWidth={ viewportWidth / 1.33 }
        firstItem={ this.state.progress - 1 }
      /> : null

    const popup = this.state.popup !== false ? 
      <Popup change={ () => this.reloadStyle() } close={ () => this.setState({'popup': false}) }/> : 
      false

    return (
      <View style={ this.styles.container }>
        { popup }
        <View style={ this.styles.header }>
          <DarkMode handler={() => {
            this.setState({'progress':0})
            this.reloadStyle()
          }}/>
          <Language handler={() => {
            this.setState({'popup': true})
            this.reloadStyle()
          }}/>
        </View>
        <Text style={ this.styles.welcome }>
          部首
        </Text>
        <Text style={ this.styles.welcome }>
          { this.title }
        </Text>
        <View style={ this.styles.carousel }>
          { levels }
        </View>
      </View>
    );
  }

  _renderItem = ({item, index}) =>  {
    
    const {navigate} = this.props.navigation;
    const isLocked = Settings.data.isProgress !== 'no' ? 
      this.state.progress <= parseInt(index) :
      false

    const textStyle = isLocked ? Settings.data.colors.background : Settings.data.colors.primary 

    return(
      <View style={ !isLocked ? this.styles.carouselItem : this.styles.carouselItemLocked }>
        <Text style={ [this.styles.carouselTitle, {color: textStyle}] }>
          { item.title }
        </Text>
        <Text style={ [{color: textStyle}] }>
          { __('words_number') }: {item.characters}
        </Text>
        <Text 
          style={ [this.styles.instructions, {color: textStyle}] } onPress={() => !isLocked ? navigate('Characters', {
            title: item.title,
            levelNumber: parseInt(index) + 1,
            charactersNumber: parseInt(item.characters),
            redirectPage: 'Hsk',
            progressKey: this.storageKey,
            type: this.props.navigation.state.params.type,
            file: 'hsk1'
        }) : ''}>
          { !isLocked ? __('start') : __('locked') }
        </Text>
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
  instructions: {
    textAlign: 'center',
    color: Settings.data.colors.primary,
    marginBottom: 5,
    padding: 10,
    borderColor: Settings.data.colors.primary,
    color: Settings.data.colors.primary,
    borderWidth: 1,
    width: '66%'
  },
  carousel: {
    width: '100%',
    height: '30%',
    marginTop: '5%'
  },
  carouselItem: {
    height: '100%',
    borderWidth: 1,
    borderColor: Settings.data.colors.primary,
    color: Settings.data.colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carouselItemLocked: {
    height: '100%',
    borderWidth: 1,
    borderColor: Settings.data.colors.background,
    color: Settings.data.colors.background,
    backgroundColor: Settings.data.colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carouselTitle: {
    fontSize: 20,
  }
}))
