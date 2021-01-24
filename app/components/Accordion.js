import React, { Component, Fragment } from 'react';
import { 
  StyleSheet, 
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Settings from '../classes/Settings';

export default class Accordion extends Component {
	
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen ? this.props.isOpen : false 
    }
    this.styles = getStyles()

  }

  componentDidUpdate(prevProps) {
    if(this.state.isOpen === this.props.isOpen) return;
    this.setState({isOpen: this.props.isOpen})
  }

	render() {
		return(
      <Fragment>
        <TouchableOpacity style={this.styles.container} onPress={() => 
          this.props.handler(this.state.isOpen ? '' : this.props.part)}>
          <View style={this.state.isOpen ? 
            [
              this.styles.button, 
              {borderBottomColor: Settings.data.colors.primary}, 
              {borderBottomWidth: 1}
            ] : this.styles.button}>
            <Text style={this.state.isOpen ? [this.styles.text, {fontWeight: 'bold'}] : this.styles.text}>
              { this.props.label }
            </Text>
            <Text style={this.styles.icon}>
              { this.state.isOpen ? '-' : '+' }
            </Text>
          </View>
          { this.state.isOpen ?
            <View style={this.styles.accordionView}>
              { this.props.children }
            </View> : null }
        </TouchableOpacity>
      </Fragment>
    )
	 }

}

const getStyles = () => (StyleSheet.create({
  accordionView: {
    width: '80%',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    marginBottom: 5,
    borderColor: Settings.data.colors.primary,
    borderWidth: 1,
    alignItems: 'center'
  },
  button: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  text: {
    width: '70%',
    textAlign: 'left',
    color: Settings.data.colors.primary,
    fontWeight: 'bold',
  },
  icon: {
    width: '30%',
    textAlign: 'right',
    fontSize: 20,
    color: Settings.data.colors.primary,
  },
}))
