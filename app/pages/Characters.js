import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  ScrollView
} from 'react-native';

// Static ata
import { CONFIG } from '../data/config'
import { getCharacters } from '../helpers/data'

export default class Characters extends Component {

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
    this.data = getCharacters(this.props.navigation.state.params.charactersNumber)
  }

  /**
   * Renders the page
   */
  render() {

    let characters = null
    if(this.data) {
      characters = Object.keys(this.data).map((item, i) => (
        <View style={styles.line}>
          <View style={styles.side}>
            <Text style={styles.text}>{item}:</Text>
          </View>
          <View>
            <Text style={styles.text}>{this.data[item][CONFIG.language]}</Text>
          </View>
        </View>
      ))
    }

    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.navigation.state.params.title}
        </Text>
        <ScrollView style={styles.scrollView}>
          {characters}
        </ScrollView>
        <Text 
          style={styles.instructions} onPress={() => navigate('Game', {
            title: this.props.navigation.state.params.title,
            levelNumber: this.props.navigation.state.params.levelNumber,
            charactersNumber: this.props.navigation.state.params.charactersNumber 
        })}>
          {'Start the game'}
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
  line: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '15%',
    marginRight: '15%',
    borderColor: CONFIG.colors.primary,
    borderBottomWidth: 1,
    paddingTop: 10,
  },
  scrollView: {
    width: '100%',
  },
  text: {
    fontSize: 18,
    textTransform: 'capitalize'
  },
  side: {
    width: '50%'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 40,
  },
  instructions: {
    margin: 40,
    textAlign: 'center',
    color: CONFIG.colors.primary,
    marginBottom: 5,
    padding: 10,
    borderColor: CONFIG.colors.primary,
    color: CONFIG.colors.primary,
    borderWidth: 1,
    width: '66%'
  },
});
