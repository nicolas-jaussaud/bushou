import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View ,
  Vibration
} from 'react-native';
import AsyncStorage from 'react-native'


import Card from '../components/Card'
import Heart from '../components/Heart'
import TimedCharacter from '../components/TimedCharacter'
import ProgressBar from '../components/ProgressBar'

import Settings  from '../classes/Settings';
import { __ } from '../data/text'

import { 
  getRandomProperty, 
  getRandomIndex,
  getUniqID,
  getShuffledArr
} from '../helpers/random'
import { getCharacters } from '../helpers/data'
import { speak, sound } from '../helpers/voice';

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

    // Needed for allowing settings into styles 
    this.styles   = getStyles()
    this.navData  = this.props.navigation.state.params

    // Get the title from the navigation
    this.title  = this.navData.title
    this.file   = this.navData.file

    // Will contain the list of the characters/definition needed by the game 
    this.data = getCharacters(
      this.navData.charactersNumber, 
      this.file,
      this.navData.firstItem ? this.navData.firstItem : false 
    )

    // Progress key for storage
    this.progressKey = this.navData.progressKey
    this.type = this.navData.type
    this.answerType =  this.navData.answerType ? this.navData.answerType : ''
    
    let answer = getRandomIndex(this.data)
    let propositions = this.setAnswerPropositions(answer, 4)

    // Time for the first round (last round will be 10 time shorter)
    this.initialSeconds = 10 
    console.log(this.navData)

    this.state = {
      answer:       answer,
      propositions: propositions,
      lives:        this.navData.lives,
      round:        0,
      seconds:      this.initialSeconds
    }

    // Avoid scope issue with methody
    this.newRound               = this.newRound.bind(this)
    this.setAnswerPropositions  = this.setAnswerPropositions.bind(this) 
    this.checkAnswer            = this.checkAnswer.bind(this)
    this.removeLife             = this.removeLife.bind(this)
    this.winRound               = this.winRound.bind(this)
    this.answerDisplay          = this.answerDisplay.bind(this)
    this.getName                = this.getName.bind(this)
    this.getCharacter           = this.getCharacter.bind(this)
  }

  componentDidMount() { 
    this.props.navigation.addListener('didFocus', () => this.styles = getStyles())
  }

  /**
   * Reset the anwser and propositions
   */
  newRound() {

    // Win the round
    if(this.state.round === this.navData.rounds) {
      this.winRound()
      return;
    }

    // Need a function for support settings
    this.styles = getStyles()

    const answer = getRandomIndex(this.data)
    const propositions = this.setAnswerPropositions(answer)

    this.setState({
      answer:       answer,
      propositions: propositions,
      seconds:      this.state.round > 10 ? this.initialSeconds / (this.state.round * 0.1) : this.initialSeconds, 
      round:        this.state.round + 1
    })
  }

  winRound = async() => {
    
    const redirectPage = this.navData.redirectPage 
    
    // If no progress enable no need to save anything
    if(Settings.data.isProgress === 'no') {
      navigate(redirectPage, {type: this.type})
      return;
    }

    AsyncStorage.getItem(this.progressKey).then(async (value) => {
      
      const {navigate} = this.props.navigation;
      const progress = (value === parseInt(value)) && (parseInt(value) !== 0) ? value : 1
      const levelProgress = parseInt(this.navData.levelNumber) 
      
      if(progress <= levelProgress) {
        let newProgress = levelProgress + 1
        AsyncStorage.setItem(this.progressKey, newProgress.toString()).then(async () => 
          navigate(redirectPage, { type: this.type }))
      }
      else{
        navigate(redirectPage, {type: this.type})
      }
    })
  }

  getName(item) {
    return this.file === 'radicals' ? 
      this.data[item].name[Settings.data.language] :
      this.data[item].translations[Settings.data.language]
  }

  getCharacter(item) {

    if(Settings.data.characters !== 'traditional') return item;
    
    return 'traditional' in this.data[item] ? this.data[item].traditional : item
  }

  /**
   * When life is equal to 0 navigate to game over page
   */
  removeLife() {

    if(Settings.data.isVibrations !== 'no') Vibration.vibrate();
    
    if(this.state.lives === 0) {
      
      const { navigate } = this.props.navigation
      const redirectPage = this.navData.redirectPage 
      
      navigate(redirectPage)
    } 
    
    let lives = this.state.lives
    lives--
    this.setState({'lives': lives})
  }

  setAnswerPropositions(answer, number = 4) {

    // First we add the right answer to the proposition
    let propositions = []
    propositions.push({
      'isCorrect': true,
      'translation': this.getName(answer),
      'data': { ...this.data[answer], 'character': answer},
    })
    
    // Then we set the wrong answer
    for (let i = 0; i < number - 1; i++) {
      let data = getRandomProperty(this.data, answer)
      propositions.push({
        'isCorrect': false,
        'translation': data.[this.file === 'radicals' ? 'name' : 'translations'].[Settings.data.language],
        'data': data
      })
    }
    return getShuffledArr(propositions)
  }

  /**
   * CHeck if the answer is correct
   */
  checkAnswer(isCorrect) {

    if(isCorrect === false) {
     this.removeLife()
    }
    else if(this.navData.file === 'hsk1') {
      this.type !== 'audio' ? speak(this.state.answer) : ''
    }
    else {
      sound('correct')
    }

    this.newRound()
  }

  /**
   * The timmed answer string
   *
   * @return     {string}
   */
  answerDisplay() {

    switch(this.type) {
      
      case 'audio': 
        speak(this.state.answer)
        return '?';
        
      case 'characters': 
        return this.state.answer

      case 'pinyin':
        return this.data[this.state.answer].pinyin

      case 'translation':
        return this.data[this.state.answer].translation[ Settings.data.language ]

      default:
        return this.getCharacter(this.state.answer)
    }
  }

  /**
   * Gets the card text.
   */
  getCardText(item) {

    switch(this.answerType) {
        
      case 'characters': 
        return item.data.characters

      case 'pinyin':
        return item.data.pinyin

      case 'translation':
        return item.data.pinyin.translation[ Settings.data.language ]

      default:
        return item.data.characters        
    }
  }

  /**
   * Renders the page
   */
  render() {
        
    // Display the card when we have the data
    const cards = this.state.propositions.length !== 0 ?
      this.state.propositions.map((item, i) => (
        <Card 
          isCorrect={ item.isCorrect } 
          key={ getUniqID() } 
          handle={ this.checkAnswer } 
          text={ this.getCardText(item) }
          isCharacter={ this.type === 'audio' }
        />
      )) : false

    let lives = []
    if(this.state.lives !== 0) {
      for (let i = 0; i < this.state.lives; i++) {
        lives.push(<Heart key={getUniqID()}/>)
      }
    }

    const answer = this.state.answer ? 
      <TimedCharacter key={ getUniqID() } seconds={this.state.seconds}>
        { this.answerDisplay() }
      </TimedCharacter> : null
    
    const timer = this.state.answer ? 
      <ProgressBar key={ getUniqID() } seconds={ this.state.seconds } handle={ this.checkAnswer }/> : null

    return (
      <View style={ this.styles.container }>
        <View style={ this.styles.header }>
          <View style={ this.styles.round }>
            <Text style={ this.styles.text }> { __('round') }: { this.state.round }/{ this.navData.rounds }</Text>
          </View>
          <View style={ this.styles.lives }>{ lives }</View>
        </View>
        <Text style={ this.styles.character }>
          { this.title }
        </Text>
        <View style={ this.styles.key }>
          { answer }
        </View>
        { timer }
        <View style={ this.styles.containerKeys }>
          { cards }
        </View>
      </View>
    );
  }
}

const getStyles = () => (StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    height: 40,
    top: 40,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  round: {
    height: 40,
  },
  lives: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    maxWidth: '60%'
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
    backgroundColor: Settings.data.colors.background,
  },
  character: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: Settings.data.colors.primary
  },
  containerKeys: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Settings.data.colors.background,
    flex: 0.25,
  },
  key: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Settings.data.colors.primary
  }
}))
