import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import { language } from '../data/config'
import Card from '../components/Card'
import Heart from '../components/Heart'
import { 
  getRandomProperty, 
  getRandomIndex 
} from '../helpers/random'

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
    if(this.state.lives === 0) navigate('Home')
    this.setState({'lives': lives})
  }

  setAnswerPropositions(answer, number = 4) {

    let propositions = []

    // First we add the right answer to the proposition
    propositions.push({
      'isCorrect': true,
      'translation': this.data[answer][language]
    })
    
    // Then we set the wrong answer
    for (let i = 0; i < number - 1; i++) {
      propositions.push({
        'isCorrect': false,
        'translation': getRandomProperty(this.data)[language]
      })
    }

    return propositions 
  }

  /**
   * CHeck if the awnser is correct
   */
  checkAnswer(isCorrect) {
    console.log(isCorrect)
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
        <Card onClick={() => this.checkAnswer(item.isCorrect)} text={item.translation} />
      ))
    }

    let lives = []
    if(this.state.lives !== 0) {
      for (let i = 0; i < this.state.lives; i++) {
        lives.push(<Heart id={i}/>)
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.lives}>{lives}</View>
        </View>
        <Text style={styles.welcome}>
          {this.title}
        </Text>
        <View style={styles.key}>
          <Text style={styles.keyText}>
            {this.state.answer}
          </Text>
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
    height: '100%',
    top: 40,
    left: 0,
    zIndex: 10,
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  'containerKeys': {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 0.33,
  },
  'keyText': {
    fontSize: 70,
  },
  'key': {
    flex: 0.33,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
