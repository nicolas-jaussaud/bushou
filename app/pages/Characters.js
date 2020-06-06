import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Settings  from '../classes/Settings';

// Static data
import { getCharacters } from '../helpers/data'
import { __ } from '../data/text'

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

    this.data = getCharacters(this.props.navigation.state.params.charactersNumber, this.props.navigation.state.params.file)
  }

  componentDidMount() { 
    this.props.navigation.addListener('didFocus', () => this.styles = getStyles())
  }
  
  /**
   * Renders the page
   */
  render() {

    let characters = null
    if(this.data) {
      characters = Object.keys(this.data).map((item, i) => {
        
        let currentCharacter = null
        if(this.state.currentCharacter === item) { 
          currentCharacter =
            <View style={this.styles.fullCharacter}>
              <Text numberOfLines={2} style={this.styles.definition} style={this.styles.fullCharacterText}>
                {item}
              </Text>
            </View>
        }

        let line = 
          <TouchableOpacity 
            style={this.styles.lineContainer} 
            onPress={() => (this.setState({currentCharacter: this.state.currentCharacter === item ? '' : item}))}
          >
            <View style={this.styles.line}>
              <View style={this.styles.characterContainer}>
                <Text style={this.styles.character}>
                  {item}
                </Text>
              </View>
              <View style={this.styles.definitionContainer}>
                <Text numberOfLines={4} style={this.styles.definition}>
                  {this.data[item][Settings.data.language]}
                </Text>
              </View>
            </View>
            { currentCharacter }
          </TouchableOpacity>

        return line
      })
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
            charactersNumber: this.props.navigation.state.params.charactersNumber,
            redirectPage: this.props.navigation.state.params.redirectPage,
            progressKey: this.props.navigation.state.params.progressKey,
            file: this.props.navigation.state.params.file
        })}>
          { __('start') }
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
  scrollView: {
    width: '100%',
  },
  character: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Settings.data.colors.background,
  },
  characterContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Settings.data.colors.primary,
  },
  definitionContainer: {
    width: '66%',
  },
  lineContainer: {
    width: '90%',
    marginLeft: '5%',
    marginBottom: 15,
    marginRight: '5%',
    flexDirection: 'column',
    color: Settings.data.colors.primary,
    borderColor: Settings.data.colors.primary,
    marginTop: 3,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: Settings.data.colors.primary,
  },
  definition: {
    margin: '5%',
    fontWeight: 'normal',
    textTransform: 'capitalize',
    color: Settings.data.colors.primary,
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
  fullCharacter: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Settings.data.colors.background,
  },
  fullCharacterText: {
    color: Settings.data.colors.primary,
    textAlign: 'center',
    fontSize: 100,
    width: '100%',
  }
}))
