import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Loader from './app/pages/Loader'
import Home from './app/pages/Home'
import Game from './app/pages/Game'
import Characters from './app/pages/Characters'
import Levels from './app/pages/Levels'
import Options from './app/pages/Options'
import Custom from './app/pages/Custom'
import Edit from './app/pages/Edit'

const Stack = createNativeStackNavigator()

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Loader"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Loader" component={Loader} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Levels" component={Levels} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Characters" component={Characters} />
      <Stack.Screen name="Options" component={Options} />
      <Stack.Screen name="Custom" component={Custom} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App
