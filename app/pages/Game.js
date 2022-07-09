import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Vibration,
  StatusBar
} from 'react-native'

import Card from '../components/Card'
import Heart from '../components/Heart'
import TimedCharacter from '../components/TimedCharacter'
import ProgressBar from '../components/ProgressBar'
import StoppedBar from '../components/StoppedBar'

import Settings  from '../classes/Settings'
import Module from '../classes/models/Module'
import Level from '../classes/models/Level'
import { __ } from '../data/text'

import { 
  getRandomProperty, 
  getUniqID,
  getShuffledArr
} from '../helpers/random'

export default class Game extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    headerShown: false,
  }

  /**
   * Constructs a new instance.
   */
  constructor(props) {
    super(props)

    // Needed for allowing settings into styles 
    this.styles   = getStyles()
    this.navData  = this.props.navigation.state.params

    this.state = {
      answer:       '',
      propositions: [],
      round:        0,
      isData:       false,
      timerStopped: false
    }

    // Avoid scope issue with methody
    this.newRound               = this.newRound.bind(this)
    this.setAnswerPropositions  = this.setAnswerPropositions.bind(this) 
    this.checkAnswer            = this.checkAnswer.bind(this)
    this.removeLife             = this.removeLife.bind(this)
    this.win                    = this.win.bind(this)
    this.getName                = this.getName.bind(this)
    this.getCharacter           = this.getCharacter.bind(this)
  }

  async componentDidMount() { 

    this.module = await new Module(this.navData.module)
    this.level  = new Level(this.navData.level, this.module)
    this.data   = this.level.getCharacters()

    const answer = this.level.getRandomIndex()

    this.module.beforeAnswer(answer, () =>
      this.setState({
        answer:       answer,
        lives:        this.module.get('lives'),
        seconds:      this.module.getInitialSeconds(),
        propositions: this.setAnswerPropositions(answer, 4),
        rounds:       this.module.getRounds(),
        isData:       true,
      })
    )
    this.props.navigation.addListener('didFocus', () => this.styles = getStyles())
  }

  /**
   * Reset the anwser and propositions
   */
  newRound() {

    if(this.state.round === this.module.getRounds()) {
      this.win()
      return;
    }

    // Need a function for support settings
    this.styles = getStyles()

    const answer = this.level.getRandomIndex()
    const propositions = this.setAnswerPropositions(answer)

    this.module.beforeAnswer(answer, () => 
      this.setState({
        answer:       answer,
        timerStopped: false,
        propositions: propositions,
        seconds:      this.module.getSecondPerRound(this.state.round + 1), 
        round:        this.state.round + 1,
      })
    )
  }

  win = async () => {

    const { navigate } = this.props.navigation
    
    // Param is callback to after save 
    this.level.completeLevel(() => {
      navigate('Levels', { key: this.module.key })
    })
  }

  getName = item => (
    this.module.get('data') === 'radicals' 
      ? this.data[item].name[Settings.data.language] 
      : this.data[item].translations[Settings.data.language]
  )

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
      navigate('Levels', { key: this.module.key })
    } 
    
    let lives = this.state.lives
    lives--
    this.setState({'lives': lives})
  }

  setAnswerPropositions(answer, number = 4) {

    // First we add the right answer to the proposition
    const propositions = []
    propositions.push({
      'isCorrect': true,
      'translation': this.getName(answer),
      'data': { ...this.data[answer], 'character': answer},
    })
    
    // Then we set the wrong answer
    for (let i = 0; i < number - 1; i++) {
      
      const data = getRandomProperty(this.data, answer)
      
      // Bad temporary way to handle this case
      if(data === false) {
        propositions.push({
          'isCorrect': true,
          'translation': this.getName(answer),
          'data': { ...this.data[answer], 'character': answer},
        })
      } else {
        propositions.push({
          'isCorrect': false,
          'translation': data[this.module.get('data') === 'radicals' ? 'name' : 'translations'][Settings.data.language],
          'data': data
        })
      }
      
    }
    
    return getShuffledArr(propositions)
  }

  /**
   * Check if the answer is correct
   */
  checkAnswer(isCorrect) {
    
    if( isCorrect === false ) {
      this.setState({'timerStopped': '#FF4646'})
      this.removeLife()
      this.newRound()
    } 
    else {
      this.setState({'timerStopped': '#6EF487'})
      this.module.correctAnswer(
        this.state.answer,
        this.newRound
      )
    }
    
  }

  getFormatedText(timed = true) {

    let text = this.module.getItemText(this.state.answer)

    /**
     * Remove prononciation text from string if any, and display it below
     */
    const pronociationString = text.includes('(') && text.includes(')')
      ? text.split('(').pop().split(')')[0]
      : false

    text = text.replace(/\(.*?\)/, '')
    
    if( this.state.timerStopped === false && timed === false ) {
      return null
    }

    return(
      <View style={ this.styles.prononciationContainer }>
        { pronociationString !== false && 
          <View>
            <Text style={ timed 
              ? this.styles.prononciation 
              : [ this.styles.prononciation, { color: this.state.timerStopped } ] 
            }>
              { pronociationString }
            </Text>
          </View> 
        }
        { timed 
          ? <TimedCharacter key={ getUniqID() } seconds={this.state.seconds}>
              { text }
            </TimedCharacter>
          : <Text style={[{ color: this.state.timerStopped, fontSize: 100 }]}>
              { text }
            </Text> }
      </View>
    )
  }

  /**
   * Renders the page
   */
  render() {

    if(this.state.isData === false) {
      return(
        <View style={ this.styles.container }></View>
      )
    }  
    
    // Display the card when we have the data
    const cards = this.state.propositions.length !== 0 ?
      this.state.propositions.map((item, i) => (
        <Card 
          isCorrect={ item.isCorrect } 
          key={ getUniqID() } 
          handle={ this.checkAnswer } 
          text={ this.module.getCardText(item) }
          isCharacter={ this.type === 'audio' }
        />
      )) : false

    const lives = []
    if(this.state.lives !== 0) {
      for (let i = 0; i < this.state.lives; i++) {
        lives.push(<Heart key={ getUniqID() }/>)
      }
    }

    const answer = this.getFormatedText(
      this.state.answer && this.state.timerStopped === false 
    )

    const timer = this.state.answer && this.state.timerStopped === false 
        ? 
          <ProgressBar key={ getUniqID() } seconds={ this.state.seconds } handle={ this.checkAnswer }/> 
        : ( 
          this.state.timerStopped !== false 
            ? <StoppedBar color={ this.state.timerStopped }></StoppedBar> 
            : null
        )

    return(
      <View style={ this.styles.container }>
        <View style={ this.styles.header }>
          <View style={ this.styles.round }>
            <Text style={ this.styles.text }> { __('round') }: { this.state.round }/{ this.state.rounds }</Text>
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
    top: StatusBar.currentHeight ?? 40,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  prononciation: {
    fontSize: 30,
    width: '100%',
    color: Settings.data.colors.primary
  },
  prononciationSuccess: {
    fontSize: 30,
    width: '100%',
    color: Settings.data.colors.primary
  },
  prononciationContainer: {
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    width: '100%'
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
