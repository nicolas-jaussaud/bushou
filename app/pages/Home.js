import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

export default class Home extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    header: null,
  }

  /**
   * Renders the page
   */
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          部首
        </Text>
        <Text style={styles.welcome}>
          BùShŏu
        </Text>
        <Text style={styles.instructions} onPress={() => navigate('Game', {title: 'Level 1'})}>
          Start the game
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
