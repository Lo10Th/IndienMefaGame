import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstTimeUsingStackScreen from './navigation/firstTimeUsingStack';

export default function App() {

  const askForUsingeBefore = async () => {
    ask = await AsyncStorage.getItem('verified');
    console.log(ask);
    if (ask == null) {
      return true;
    } else {
      return false;
    }
  }

  if (askForUsingeBefore() === false) {
    return (
      <NavigationContainer>
        <FirstTimeUsingStackScreen />
      </NavigationContainer>
    );}
  else {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
  }
}