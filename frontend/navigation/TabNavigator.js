import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStack';
import SettingsStackScreen from './SettingsStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#080B0F',
          borderColor: '#080B0F',
        },
      }}
    >
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Einstellungen" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}
