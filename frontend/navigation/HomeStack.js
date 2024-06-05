import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MatScreen from '../screens/matScreen';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeStack" component={HomeScreen} />
      <HomeStack.Screen 
        name="MatScreenBling" 
        component={MatScreen} 
        initialParams={{ MatName: 'bling' }} 
      />
      <HomeStack.Screen 
        name="MatScreenGold" 
        component={MatScreen} 
        initialParams={{ MatName: 'gold' }} 
      />
      <HomeStack.Screen 
        name="MatScreenWood" 
        component={MatScreen} 
        initialParams={{ MatName: 'wood' }} 
      />
    </HomeStack.Navigator>
  );
}