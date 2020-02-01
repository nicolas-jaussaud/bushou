import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Settings from '../classes/Settings'

export default class TimedCharacter extends Component {
  
  /**
   * Constructs a new instance.
   */
  constructor(props) {
    super(props)
    
    this.initialSize  = 100
    this.milliseconds = this.props.seconds * 1000 
    this.timeoutStep  = this.milliseconds / 100 
    
    this.state = {
      size: this.initialSize,
      opacity: 1
    }

    this.startAnimation = this.startAnimation.bind(this)
  }

  componentDidMount() { 
    this.startAnimation()
  }

  startAnimation() {
    setTimeout(() => {
      this.setState({
        'size': this.state.size + ((this.state.opacity * 0.1)/ 0.1),
        'opacity': this.state.opacity - 0.01,
      })
      this.startAnimation()
    }, this.timeoutStep); 
  }
  /**
   * Renders the page
   */
  render() {
    return(
      <Text style={{fontSize: this.state.size, opacity: this.state.opacity, color: Settings.data.colors.primary}}>
        {this.props.children}    
      </Text>
    )
   }

}
