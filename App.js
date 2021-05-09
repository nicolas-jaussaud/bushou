// Navigation
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Pages
import Loader from './app/pages/Loader'
import Home from './app/pages/Home'
import Game from './app/pages/Game'
import Characters from './app/pages/Characters'
import Levels from './app/pages/Levels'
import Options from './app/pages/Options'
import Custom from './app/pages/Custom'
import Edit from './app/pages/Edit'

// @see https://facebook.github.io/react-native/docs/navigation
const MainNavigator = createStackNavigator({
    Loader: { screen: Loader },
    Home: { screen: Home },
    Levels: { screen: Levels },
    Game: { screen: Game },
    Characters: { screen: Characters },
    Options: { screen: Options }, 
    Custom: { screen: Custom }, 
    Edit: { screen: Edit }, 
  },{
    initialRouteName: 'Loader'
  }
);

const App = createAppContainer( MainNavigator );

export default App;
