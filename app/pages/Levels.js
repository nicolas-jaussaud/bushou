import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Dimensions
} from 'react-native';

import Settings from '../classes/Settings';
import DarkMode from '../components/DarkMode'
import Language from '../components/Language'
import Popup from '../components/Popup'

import { getModule } from '../helpers/modules'
import { __ } from '../data/text'

// Dependencies
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export default class Levels extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      progress: false,
      levels: false,
      popup: false
    }

    // Need a function for support settings
    this.styles = getStyles()
    
    this.getProgress = this.getProgress.bind(this)
  }

  async init() {

    this.key = this.props.navigation.state.params.key
    this.styles = getStyles()

    this.module = await getModule(this.key)
    await this.getProgress()
    
    this.setState({levels: this.module.getLevels()})
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.setState({
        progress: false,
        levels: false
      }, () => this.init())
    })
  }

  getProgress = async () => (this.setState({progress: await this.module.getProgress(true)}))

  /**
   * We need to add "Hsk" and "Radicals" for static HSK modules
   */
  getTitle() {

    if(!this.module) return '';
    if(!this.module.isStatic) return this.module.getTitle();

    return this.module.get('data') === 'hsk1'
      ? 'HSK 1 - ' + this.module.getTitle()
      : __('radicals') + ' - ' + this.module.getTitle()
  }

  /**
   * Renders the page
   */
  render() {
    
    // Show the progress only when we load the progress number
    const levels = this.state.levels !== false && this.state.progress !== false ?
      <Carousel
        layout='default'
        ref={ c => this._carousel = c }
        data={ this.state.levels }
        renderItem={ this._renderItem }
        sliderWidth={ viewportWidth }
        itemWidth={ viewportWidth / 1.33 }
        firstItem={ Settings.data.isProgress !== 'no' ? this.state.progress : false }
      /> : null

    const popup = this.state.popup !== false ? 
      <Popup change={ () => this.init() } close={ () => this.setState({'popup': false}) }/> : 
      false

    return (
      <View style={ this.styles.container }>
        { popup }
        <View style={ this.styles.header }>
          <DarkMode handler={() => {
            this.setState({'progress': false}, () => this.init())
          }}/>
          <Language handler={() => {
            this.setState({'popup': true}, () => this.init())
          }}/>
        </View>
        <Text style={ this.styles.welcome }>
          部首
        </Text>
        <Text style={ this.styles.welcome }>
          { this.getTitle() }
        </Text>
        <View style={ this.styles.carousel }>
          { levels }
        </View>
      </View>
    );
  }

  _renderItem = ({item}) => {
    
    const level = item
    const { navigate } = this.props.navigation

    const isLocked = Settings.data.isProgress !== 'no' 
      ? (this.state.progress + 1) < parseInt(level.number) 
      : false
    const textStyle = isLocked ? Settings.data.colors.background : Settings.data.colors.primary 
    
    return(
      <View style={ !isLocked ? this.styles.carouselItem : this.styles.carouselItemLocked }>
        <Text style={ [this.styles.carouselTitle, {color: textStyle}] }>
          { level.getTitle() }
        </Text>
        <Text style={ [{color: textStyle}] }>
          { __('words_number') }: { level.getCharacterNumber() }
        </Text>
        <Text 
          style={[this.styles.instructions, {color: textStyle}] } onPress={
            () => !isLocked ? navigate('Characters', {
              module: this.module.key,
              level: level.number,
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
