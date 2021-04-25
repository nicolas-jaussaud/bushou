import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Settings  from '../classes/Settings';
import { speak } from '../helpers/voice';
import { getUniqID } from '../helpers/random'

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

    this.navData = this.props.navigation.state.params

    // Source file (json)
    this.file = this.navData.file

    const charactersNumber  = this.navData.charactersNumber
    const firstCharacters   = this.navData.firstItem ? this.navData.firstItem : false 

    this.lives  = this.navData.lives
    this.data   = getCharacters(charactersNumber, this.file, firstCharacters)

    this.getCharacter = this.getCharacter.bind(this)
    this.getName      = this.getName.bind(this)
  }

  componentDidMount() { 
    this.props.navigation.addListener('didFocus', () => this.styles = getStyles())
  }
  
  getCharacter(item) {
    
    if(Settings.data.characters !== 'traditional') return item;
    
    return 'traditional' in this.data[item] ? this.data[item].traditional : item
  }

  getName(item) {
    return this.file === 'radicals' ? 
      this.data[item].name[Settings.data.language] :
      this.data[item].translations[Settings.data.language]
  }

  /**
   * Renders the page
   */
  render() {

    const characters = this.data ?
      Object.keys(this.data).map((item, i) => {
        const currentCharacter = this.state.currentCharacter === item ? 
          <View style={ this.styles.fullCharacter }>
            <Text numberOfLines={2} style={ this.styles.definition } style={ this.styles.fullCharacterText }>
              { this.getCharacter(item) }
            </Text>
          </View> : null

        return( 
          <TouchableOpacity 
            key={ getUniqID() }
            style={ this.styles.lineContainer } 
            onPress={() => {
              this.file === 'hsk1' ? speak(item) : ''
              this.setState({currentCharacter: this.state.currentCharacter === item ? '' : item})
            }}
          >
            <View style={ this.styles.line }>
              <View style={ this.styles.characterContainer }>
                <Text style={ this.styles.character }>
                  { this.getCharacter(item) }
                </Text>
              </View>
              <View style={ this.styles.definitionContainer }>
                <Text numberOfLines={ 4 } style={ this.styles.definition }>
                  { this.getName(item) } {
                    this.file === 'hsk1' ?
                      <Text style={ this.styles.pinyin }> - { this.data[item].pinyin }</Text> : '' 
                    }
                </Text>
              </View>
            </View>
            { currentCharacter }
          </TouchableOpacity>
        )
      }) : null

    const { navigate } = this.props.navigation;

    return (
      <View style={ this.styles.container }>
        <Text style={ this.styles.title }>
          { this.navData.title }
        </Text>
        <ScrollView style={ this.styles.scrollView }>
          { characters }
        </ScrollView>
        <Text 
          style={ this.styles.instructions } onPress={() => navigate('Game', this.navData )}>
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
  },
  pinyin: {
    fontStyle: 'italic'
  }
}))
