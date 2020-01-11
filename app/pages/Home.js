import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  AsyncStorage 
} from 'react-native';

// Static ata
import { CONFIG } from '../data/config'
import { LEVELS } from '../data/levels'

// Dependencies
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

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
    this.getProgress = this.getProgress.bind(this)
  }

  componentDidMount() { 
    this.getProgress()
  }

  getProgress = async () => {
    AsyncStorage.getItem('progress', (value) =>{
      this.setState({progress: value == null ? 1 : parseInt(value)})
    })
  }

  /**
   * Renders the page
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          部首
        </Text>
        <Text style={styles.welcome}>
          BùShŏu
        </Text>
        <View style={styles.carousel}>
          <Carousel
            layout='default'
            ref={(c) => { this._carousel = c; }}
            data={LEVELS}
            renderItem={this._renderItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth/1.33}
          />
        </View>
      </View>
    );
  }

  _renderItem = ({item, index}) => {
    
    const {navigate} = this.props.navigation;
    const isLocked = this.state.progress <= parseInt(index) 
    const textStyle = isLocked ? {color: CONFIG.colors.background} : {color: CONFIG.colors.primary}
    
    return(
      <View style={!isLocked ? styles.carouselItem : styles.carouselItemLocked}>
        <Text style={[styles.carouselTitle, textStyle]}>
          { item.title }
        </Text>
        <Text style={textStyle}>
          Number of characters: {item.characters}
        </Text>
        <Text 
          style={[styles.instructions, textStyle]} onPress={() => navigate('Characters', {
            title: item.title,
            levelNumber: parseInt(index),
            charactersNumber: parseInt(item.characters) 
        })}>
          {!isLocked ? 'Start the game' : 'Locked'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONFIG.colors.background,
    color: CONFIG.colors.primary,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: CONFIG.colors.primary,
    marginBottom: 5,
    padding: 10,
    borderColor: CONFIG.colors.primary,
    color: CONFIG.colors.primary,
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
    borderColor: CONFIG.colors.primary,
    color: CONFIG.colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carouselItemLocked: {
    height: '100%',
    borderWidth: 1,
    borderColor: CONFIG.colors.background,
    color: CONFIG.colors.background,
    backgroundColor: CONFIG.colors.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carouselTitle: {
    fontSize: 20,
  }
});
