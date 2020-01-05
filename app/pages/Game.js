import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import Card from '../components/Card'
import Heart from '../components/Heart'
import TimedCharacter from '../components/TimedCharacter'

import { 
  getRandomProperty, 
  getRandomIndex,
  getUniqID,
  getShuffledArr
} from '../helpers/random'
import { config } from '../data/config'

export default class Game extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    header: null,
  }

  /**
   * Constructs a new instance.
   */
  constructor(props) {
    super(props)

    // Get the title from the navigation
    this.title = this.props.navigation.state.params.title
    
    // Will contain the list of the characters/definition needed by the game
    this.data = require('../data/data.json')

    let answer = getRandomIndex(this.data)
    let propositions = this.setAnswerPropositions(answer, 4)

    this.state = {
      'answer': answer,
      'propositions': propositions,
      'lives': 3
    }

    // Avoid scope issue with methody
    this.newRound               = this.newRound.bind(this)
    this.setAnswerPropositions  = this.setAnswerPropositions.bind(this) 
    this.checkAnswer            = this.checkAnswer.bind(this)
    this.removeLife             = this.removeLife.bind(this)
  }

  /**
   * Reset the anwser and propositions
   */
  newRound() {
    const answer = getRandomIndex(this.data)
    const propositions = this.setAnswerPropositions(answer)

    this.setState({
      'answer': answer,
      'propositions': propositions
    })
  }

  /**
   * When life is equal to 0 navigate to game over page
   */
  removeLife() {
    let lives = this.state.lives
    lives--
    if(this.state.lives === 0) {
      const {navigate} = this.props.navigation;
      navigate('Home')
    } 
    this.setState({'lives': lives})
  }

  setAnswerPropositions(answer, number = 4) {

    // First we add the right answer to the proposition
    let propositions = []
    propositions.push({
      'isCorrect': true,
      'translation': this.data[answer][config.language]
    })
    
    // Then we set the wrong answer
    for (let i = 0; i < number - 1; i++) {
      propositions.push({
        'isCorrect': false,
        'translation': getRandomProperty(this.data)[config.language]
      })
    }
    return getShuffledArr(propositions)
  }

  /**
   * CHeck if the awnser is correct
   */
  checkAnswer(isCorrect) {
    if(isCorrect === true) {
      this.newRound()
    }
    else{
      this.removeLife()
    }
  }

  /**
   * Renders the page
   */
  render() {
    
    const {navigate} = this.props.navigation
    
    // Display the card when we have the data
    let cards = null
    if(this.state.propositions.length !== 0) {
      cards = this.state.propositions.map((item, i) => (
        <Card isCorrect={item.isCorrect} key={getUniqID()} handle={this.checkAnswer} text={item.translation} />
      ))
    }

    let lives = []
    if(this.state.lives !== 0) {
      for (let i = 0; i < this.state.lives; i++) {
        lives.push(<Heart key={getUniqID()}/>)
      }
    }

    let answer = null
    if(this.state.answer) {
      answer = <TimedCharacter seconds={6}>{this.state.answer}</TimedCharacter>
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.lives}>{lives}</View>
        </View>
        <Text style={styles.character}>
          {this.title}
        </Text>
        <View style={styles.key}>
          { answer }
        </View>
        <View style={styles.containerKeys}>
          {cards}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    height: 40,
    top: 40,
    left: 0,
    height: 40,
    flexDirection: 'row-reverse'
  },
  lives: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap'
  },
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.colors.background,
  },
  character: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: config.colors.primary
  },
  'containerKeys': {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: config.colors.background,
    flex: 0.33,
  },
  'key': {
    flex: 0.33,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
