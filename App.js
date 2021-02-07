import React, { Component } from 'react';

// Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Pages
import Loader from './app/pages/Loader';
import Home from './app/pages/Home';
import Game from './app/pages/Game';
import Characters from './app/pages/Characters';
import Radicals from './app/pages/Radicals';
import Hsk from './app/pages/Hsk';
import Options from './app/pages/Options';
import Custom from './app/pages/Custom';

// @see https://facebook.github.io/react-native/docs/navigation
const MainNavigator = createStackNavigator({
    Loader: { screen: Loader },
    Home: { screen: Home },
    Radicals: { screen: Radicals },
    Hsk: { screen: Hsk },
    Game: { screen: Game },
    Characters: { screen: Characters },
    Options: { screen: Options }, 
    Custom: { screen: Custom }, 
  },{
    initialRouteName: 'Loader'
  }
);

const App = createAppContainer( MainNavigator );

export default App;
