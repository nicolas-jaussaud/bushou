import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  ScrollView
} from 'react-native';

import Settings  from '../classes/Settings';

// Static data
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

    // Need a function for support settings
    this.styles = getStyles()

    this.data = getCharacters(this.props.navigation.state.params.charactersNumber)
  }

  /**
   * Renders the page
   */
  render() {

    let characters = null
    if(this.data) {
      characters = Object.keys(this.data).map((item, i) => (
        <View style={this.styles.line}>
          <View style={this.styles.side}>
            <Text style={this.styles.text}>{item}:</Text>
          </View>
          <View>
            <Text style={this.styles.text}>{this.data[item][Settings.data.language]}</Text>
          </View>
        </View>
      ))
    }

    const {navigate} = this.props.navigation;

    return (
      <View style={this.styles.container}>
        <Text style={this.styles.title}>
          {this.props.navigation.state.params.title}
        </Text>
        <ScrollView style={this.styles.scrollView}>
          {characters}
        </ScrollView>
        <Text 
          style={this.styles.instructions} onPress={() => navigate('Game', {
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

const getStyles = () => (StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Settings.data.colors.background,
    color: Settings.data.colors.primary,
  },
  line: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '15%',
    marginRight: '15%',
    color: Settings.data.colors.primary,
    borderColor: Settings.data.colors.primary,
    borderBottomWidth: 1,
    paddingTop: 10,
  },
  scrollView: {
    width: '100%',
  },
  text: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: Settings.data.colors.primary,
  },
  side: {
    width: '50%'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 40,
    color: Settings.data.colors.primary,
  },
  instructions: {
    margin: 40,
    textAlign: 'center',
    color: Settings.data.colors.primary,
    marginBottom: 5,
    padding: 10,
    borderColor: Settings.data.colors.primary,
    color: Settings.data.colors.primary,
    borderWidth: 1,
    width: '66%'
  },
}))
