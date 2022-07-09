import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View
} from 'react-native';

import Settings  from '../classes/Settings';

export default class Loader extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    headerShown: false,
  }

  constructor(props) {
    super(props)
    this.state = {}

    this.settings = new Settings()
    this.init()
  }

  componentDidMount() { 
    this.props.navigation.addListener('didFocus', () => this.init())
  }

  init = async() => {
    await this.settings.init()
    const {navigate} = this.props.navigation;
    navigate('Home')
  }

  /**
   * Renders the page
   */
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.loading}>
          部首
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Settings.data.colors.background,
    color: Settings.data.colors.primary,
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
