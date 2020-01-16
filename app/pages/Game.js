import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View ,
  AsyncStorage
} from 'react-native';

import Card from '../components/Card'
import Heart from '../components/Heart'
import TimedCharacter from '../components/TimedCharacter'
import ProgressBar from '../components/ProgressBar'

import { 
  getRandomProperty, 
  getRandomIndex,
  getUniqID,
  getShuffledArr
} from '../helpers/random'
import { getCharacters } from '../helpers/data'

import { CONFIG } from '../data/config'

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
    this.data = getCharacters(this.props.navigation.state.params.charactersNumber)

    let answer = getRandomIndex(this.data)
    let propositions = this.setAnswerPropositions(answer, 4)

    // Time for the first round (las round will be 10 time shorter)
    this.initialSeconds = 10 

    this.state = {
      'answer': answer,
      'propositions': propositions,
      'lives': 3,
      'round': 0,
      'seconds': this.initialSeconds
    }

    // Avoid scope issue with methody
    this.newRound               = this.newRound.bind(this)
    this.setAnswerPropositions  = this.setAnswerPropositions.bind(this) 
    this.checkAnswer            = this.checkAnswer.bind(this)
    this.removeLife             = this.removeLife.bind(this)
    this.winRound               = this.winRound.bind(this)
  }

  /**
   * Reset the anwser and propositions
   */
  newRound() {

    // Win the round
    if(this.state.round === 100) {
      this.winRound()
      return;
    }

    const answer = getRandomIndex(this.data)
    const propositions = this.setAnswerPropositions(answer)

    this.setState({
      'answer': answer,
      'propositions': propositions,
      'seconds': this.state.round > 10 ? this.initialSeconds / (this.state.round * 0.1) : this.initialSeconds, 
      'round': this.state.round + 1
    })
  }

  winRound = async() => {
    AsyncStorage.getItem('progress').then(async (value) => {
      
      const {navigate} = this.props.navigation;
      const progress = (value === parseInt(value)) && (parseInt(value) !== 0) ? value : 1
      const levelProgress = parseInt(this.props.navigation.state.params.levelNumber) 
      
      if(progress <= levelProgress) {
        let newProgress = levelProgress + 1
        AsyncStorage.setItem('progress', newProgress.toString()).then(async () => navigate('Home'))
      }
      else{
        navigate('Home')
      }
    })
  }

  /**
   * When life is equal to 0 navigate to game over page
   */
  removeLife() {
    if(this.state.lives === 0) {
      const {navigate} = this.props.navigation
      navigate('Home')
    } 
    let lives = this.state.lives
    // lives--
    this.setState({'lives': lives})
  }

  setAnswerPropositions(answer, number = 4) {

    // First we add the right answer to the proposition
    let propositions = []
    propositions.push({
      'isCorrect': true,
      'translation': this.data[answer][CONFIG.language]
    })
    
    // Then we set the wrong answer
    for (let i = 0; i < number - 1; i++) {
      propositions.push({
        'isCorrect': false,
        'translation': getRandomProperty(this.data, answer)[CONFIG.language]
      })
    }
    return getShuffledArr(propositions)
  }

  /**
   * CHeck if the answer is correct
   */
  checkAnswer(isCorrect) {
    if(isCorrect === false) this.removeLife()
    this.newRound()
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
    let timer = null
    if(this.state.answer) {
      answer = <TimedCharacter key={getUniqID()} seconds={this.state.seconds}>{this.state.answer}</TimedCharacter>
      timer = <ProgressBar key={getUniqID()} seconds={this.state.seconds} handle={this.checkAnswer}/>
    }


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.round}>
            <Text> Round: {this.state.round}/100</Text>
          </View>
          <View style={styles.lives}>{lives}</View>
        </View>
        <Text style={styles.character}>
          {this.title}
        </Text>
        <View style={styles.key}>
          { answer }
        </View>
        { timer }
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  'round': {
    height: 40,
  },
  lives: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap'
  },
  round: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    marginLeft: 50
  },
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONFIG.colors.background,
  },
  character: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: CONFIG.colors.primary
  },
  'containerKeys': {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CONFIG.colors.background,
    flex: 0.25,
  },
  'key': {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
