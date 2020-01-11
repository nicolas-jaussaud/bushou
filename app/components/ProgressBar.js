import React, { Component } from 'react';
import { 
  StyleSheet,
  View
} from 'react-native';

import { CONFIG } from '../data/config'

export default class ProgressBar extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      'progress': 0
    }
    this.interval = (this.props.seconds * 1000) / 100 
    this.startTimer = this.startTimer.bind(this)
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer() {
    setTimeout(() => {
      if(this.state.progress === 100) {
        this.props.handle(false)
        return;
      } 
      this.setState({progress: this.state.progress + 1},
        this.startTimer())
    }, this.interval)
  }

  /**
   * Renders the page
   */
  render() {
    return(
      <View style={styles.container}>
        <View style={{
          flex: this.state.progress/100,
          opacity: 1 - (this.state.progress/100),
          height: '100%',
          backgroundColor: CONFIG.colors.primary
        }}>
        </View>
      </View>
    )
   }

}

const styles = StyleSheet.create({
  'container': {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '80%',
    flex: 0.1,
    height: '5%',
    backgroundColor: CONFIG.colors.background,
    marginTop: 10,
    marginBottom: 10
  },
})
