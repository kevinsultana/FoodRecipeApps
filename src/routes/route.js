import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DetailScreen from '../screens/DetailScreen';
import Favorite from '../screens/Favorite';
import SurpriseRecipe from '../screens/SurpriseRecipe';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{statusBarHidden: true}}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{statusBarBackgroundColor: 'white', statusBarStyle: 'dark'}}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{
          statusBarStyle: 'dark',
          statusBarBackgroundColor: 'white',
        }}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{statusBarBackgroundColor: 'red'}}
      />
      <Stack.Screen
        name="SurpriseRecipe"
        component={SurpriseRecipe}
        options={{statusBarBackgroundColor: 'red'}}
      />
    </Stack.Navigator>
  );
}
