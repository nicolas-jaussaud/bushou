import React, { Component } from 'react';

// Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Pages
import Home from './app/pages/Home';
import Game from './app/pages/Game';
import Characters from './app/pages/Characters';

// @see https://facebook.github.io/react-native/docs/navigation
const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Game: { screen: Game },
  Characters: { screen: Characters }, 
});

const App = createAppContainer( MainNavigator );

export default App;
