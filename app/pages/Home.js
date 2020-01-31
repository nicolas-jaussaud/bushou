import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  AsyncStorage 
} from 'react-native';

import Settings from '../classes/Settings';

// Static data
import { LEVELS } from '../data/levels'

// Dependencies
import Carousel from 'react-native-snap-carousel';

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
      'progress': 0
    }

    // Need a function for support settings
    this.styles = getStyles()
    
    this.getProgress = this.getProgress.bind(this)
  }

  componentDidMount() { 
    this.getProgress()
    this.props.navigation.addListener('didFocus', () => this.getProgress())
  }

  getProgress = async () => {
    AsyncStorage.getItem('progress').then(async (value) => {
      const progress = value ? value : 1
      this.setState({progress: progress})
    })
  }

  /**
   * Renders the page
   */
  render() {

    // Show the progress only when we load the progress number
    let levels = null
    if(this.state.progress !== 0) {
      levels =
      <Carousel
        layout='default'
        ref={(c) => { this._carousel = c; }}
        data={LEVELS}
        renderItem={this._renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth/1.33}
      />
    }

    return (
      <View style={this.styles.container}>
        <Text style={this.styles.welcome}>
          部首
        </Text>
        <Text style={this.styles.welcome}>
          BùShŏu
        </Text>
        <View style={this.styles.carousel}>
          { levels }
        </View>
      </View>
    );
  }

  _renderItem = ({item, index}) =>  {
    
    const {navigate} = this.props.navigation;
    const isLocked = this.state.progress <= parseInt(index)
    let textStyle = isLocked ? Settings.data.colors.background : Settings.data.colors.primary 

    return(
      <View style={!isLocked ? this.styles.carouselItem : this.styles.carouselItemLocked}>
        <Text style={[this.styles.carouselTitle, {color: textStyle}]}>
          {item.title}
        </Text>
        <Text style={[{color: textStyle}]}>
          Number of characters: {item.characters}
        </Text>
        <Text 
          style={[this.styles.instructions, {color: textStyle}]} onPress={() => !isLocked ? navigate('Characters', {
            title: item.title,
            levelNumber: parseInt(index) + 1,
            charactersNumber: parseInt(item.characters) 
        }) : ''}>
          {!isLocked ? 'Start the game' : 'Locked'}
        </Text>
      </View>
    );
  }
}

const getStyles = () => (StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Settings.data.colors.background,
    color: Settings.data.colors.primary,
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
