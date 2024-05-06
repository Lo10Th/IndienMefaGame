import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstTimeUsingStackScreen from './navigation/firstTimeUsingStack';

export default function App() {
  if (AsyncStorage.getItem('token') == null) {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );}
  else {
    return (
      <NavigationContainer>
        <FirstTimeUsingStackScreen />
      </NavigationContainer>
    );
  }
}