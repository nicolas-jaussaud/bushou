import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class TimedCharacter extends Component {
  
  /**
   * Constructs a new instance.
   */
  constructor(props) {
    super(props)
    this.state = {
      size: 100,
      opacity: 1
    }

    this.startTimer     = this.startTimer.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
  }

  componentDidMount() {
    this.startTimer() 
    this.startAnimation() 
  }

  startTimer() {
    setTimeout(() => {
      console.log('dead')
    }, this.props.seconds * 1000);
  }

  startAnimation() {
    setTimeout(() => {
      this.setState({
        'size': this.state.size - 0.1,
        'opacity': this.state.opacity - 0.01,
      })
      this.startAnimation()
    }, 10); 
  }
  /**
   * Renders the page
   */
  render() {
    return(
      <Text style={{fontSize: this.state.size, opacity: this.state.opacity}}>
        {this.props.children}    
      </Text>
    )
   }

}
